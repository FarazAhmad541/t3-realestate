import PropertyDetails from './_components/PropertyDetailsPage/Propertydetails';
import getAuthorDetails from './actions/getAuthorDetails';
import getListingDetails from './actions/getListingDetails';
import getListingImagesKeys from './actions/getListingImageKeys';

type Params = Promise<{ id: string }>;

export default async function Page(pageProps: { params: Params }) {
    const params = await pageProps.params;
    const id = params.id;
    const imagesKeys = await getListingImagesKeys(id);
    const data = await getListingDetails(id);
    const authorDetails = await getAuthorDetails(data.author_id);
    return (
        <div>
            <PropertyDetails
                imagesKeys={imagesKeys}
                data={data}
                authorDetails={authorDetails}
            />
        </div>
    );
}
