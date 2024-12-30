import { Webhook } from 'svix';

import { NextResponse } from 'next/server';

import { WebhookEvent } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { UserInsertSchema, users } from '~/server/db/schema';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("Missing 'CLERK_WEBHOOK_SECRET' environment variable");
    }

    const svix_id = req.headers.get('svix-id') ?? '';
    const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
    const svix_signature = req.headers.get('svix-signature') ?? '';

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing or malformed svix headers');
        return NextResponse.json(
            { error: 'Missing or malformed svix headers' },
            { status: 400 },
        );
    }

    const body = await req.text();

    const svix = new Webhook(WEBHOOK_SECRET);

    let payload: WebhookEvent;

    try {
        payload = svix.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return NextResponse.json(
            { error: 'Error verifying webhook' },
            { status: 400 },
        );
    }

    const eventType = payload.type;

    if (
        eventType === 'user.created' &&
        payload.data.public_metadata.role === 'USER'
    ) {
        try {
            const {
                email_addresses,
                primary_email_address_id,
                id,
                first_name,
                last_name,
                external_accounts,
            } = payload.data;
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id,
            );

            if (!primaryEmail) {
                console.error('No primary email found');
                return NextResponse.json(
                    { error: 'No primary email found' },
                    { status: 400 },
                );
            }

            const user: UserInsertSchema = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: primaryEmail.email_address,
                auth_provider: external_accounts[0]?.provider ?? 'unknown',
                created_at: new Date(),
                updated_at: new Date(),
            };

            await db.insert(users).values(user);
        } catch (err) {
            console.error('Error creating user in database:', err);
            return NextResponse.json(
                { error: 'Error creating user in database' },
                { status: 500 },
            );
        }
    }

    console.log('USER CREATED');

    return NextResponse.json(
        { message: 'Webhook processed successfully' },
        { status: 200 },
    );
}
