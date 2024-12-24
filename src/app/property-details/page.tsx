import PropertyDetails from './_components/PropertyDetailsPage/Propertydetails';
import getListingImagesKeys from './actions/getListingImageKeys';

export default async function Page() {
    const imagesKeys = await getListingImagesKeys(
        '1_Kanal_Modern_House_for_Sale_in_DHA_Phase_2_14201603',
    );
    return (
        <div>
            <PropertyDetails imagesKeys={imagesKeys} />
        </div>
    );
}
