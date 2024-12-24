import { describe, expect, test, vi } from 'vitest';

import { NextRequest } from 'next/server';

import { POST } from '../app/api/images/upload/route';

// Mock external services or functions
vi.mock('../lib/uploadImage', () => ({
    uploadImage: vi.fn().mockResolvedValue(true),
}));

// Mock NextResponse
vi.mock('next/server', () => ({
    NextResponse: {
        json: vi.fn().mockImplementation((data, init) => ({
            status: init?.status || 200,
            json: async () => data,
        })),
    },
}));

describe('POST /api/upload-images', () => {
    test('should return ok response when images are uploaded successfully', async () => {
        // Arrange
        const mockRequest = new NextRequest(
            'http://localhost:3000/api/upload-images',
            {
                method: 'POST',
                body: JSON.stringify({
                    listing_id: '123',
                    images: ['image1.jpg', 'image2.jpg'],
                    signedUrls: [
                        'https://example.com/upload1',
                        'https://example.com/upload2',
                    ],
                }),
            },
        );

        // Act
        const response = await POST(mockRequest);

        // Assert
        expect(response.status).toBe(200);
        const responseData = await response.json();
        expect(responseData).toEqual({
            message: 'Images uploaded successfully',
        });
    });

    test('should return 400 error for invalid input', async () => {
        const mockRequest = new NextRequest(
            'http://localhost:3000/api/upload-images',
            {
                method: 'POST',
                body: JSON.stringify({
                    listing_id: '123',
                    // Missing images and signedUrls
                }),
            },
        );

        const response = await POST(mockRequest);

        expect(response.status).toBe(400);
        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'Invalid input' });
    });
});
