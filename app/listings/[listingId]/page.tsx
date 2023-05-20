import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({params}: { params: IParams }) => {
    // no need to use next router to get params because server side rendering
    // params come from app/listings/[listingId]
    console.log({params})
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return <EmptyState />
    }

    return (
        <ListingClient listing={listing} currentUser={currentUser} />
    )
}

export default ListingPage;
