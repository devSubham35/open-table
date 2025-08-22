import { CookingPot, Dot, Globe, MapPin } from 'lucide-react'
import { FaStar } from 'react-icons/fa'
import { RestaurantData, Review } from '@/api/hook/dashboard/resturant/schema'
import { calculateAverageRating } from '@/lib/functions/_helper.lib'

interface ResturantDetailsHeaderProps {
    data: RestaurantData | null
}

const ResturantDetailsHeader = ({ data }: ResturantDetailsHeaderProps) => {

    const averageRating = calculateAverageRating(data?.reviews as Review[])

    return (
        <div className="my-5">
            <h1 className="text-5xl font-medium mb-4">{data?.name}</h1>
            <div className="flex items-center gap-1 text-muted-foreground font-medium">
                <p className="flex items-center gap-2">
                    <FaStar size={20} className="text-yellow-400" />
                    {averageRating} ( {data?.reviews?.length} )
                </p>
                <Dot />
                <p className='flex items-center gap-1'>
                    <MapPin size={20} className="mr-1 text-emerald-600" />
                    {data?.location?.name}
                </p>
                <Dot />
                <p className='flex items-center gap-1'>
                    <CookingPot size={20} className="mr-1 text-orange-600" />
                    {data?.region?.name}
                </p>
            </div>
        </div>
    )
}

export default ResturantDetailsHeader