import { CookingPot, Dot, Globe, MapPin } from 'lucide-react'
import { FaStar } from 'react-icons/fa'
import { RestaurantData } from '@/api/hook/dashboard/resturant/schema'

interface ResturantDescriptionProps {
    data: RestaurantData | null
}

const ResturantDescription = ({ data }: ResturantDescriptionProps) => {
    return (
        <div className="my-5">
            <h1 className="text-5xl font-medium mb-4">{data?.name}</h1>
            <div className="flex items-center gap-1 text-muted-foreground font-medium">
                <p className="flex items-center gap-2">
                    <FaStar size={20} className="text-primary" />
                    4.7 (4500)
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

export default ResturantDescription