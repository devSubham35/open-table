"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction } from "react"
import { ChevronDown, Filter } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FilterMenuResponse } from "@/api/hook/dashboard/resturant/schema"
import FilterMenuSkeleton from "@/components/global/skeletons/FilterMenuSkeleton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const priceOptions = [
    { label: "Cheap", value: "CHEAP" },
    { label: "Regular", value: "REGULAR" },
    { label: "Expensive", value: "EXPENSIVE" },
]

export interface FilterState {
    priceTag: string[]
    regionIds: string[]
    locationIds: string[]
}

interface FilterSideBarProps {
    loading?: boolean
    filters: FilterState
    data: FilterMenuResponse
    setFilters: Dispatch<SetStateAction<FilterState>>
}

const FilterSideBar = ({ data, filters, setFilters, loading }: FilterSideBarProps) => {
    const toggleSelection = (key: keyof FilterState, value: string) => {
        setFilters((prev) => {
            const alreadySelected = prev[key].includes(value)
            return {
                ...prev,
                [key]: alreadySelected
                    ? prev[key].filter((item) => item !== value)
                    : [...prev[key], value],
            }
        })
    }

    const clearAllFilters = () => {
        setFilters({
            regionIds: [],
            locationIds: [],
            priceTag: [],
        })
    }

    const CollapsibleContentCSS = "mt-2 space-y-2 overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"

    return (
        <div className="w-[250px] h-full shrink-0 px-4 pb-8 space-y-4 overflow-y-auto relative">
            {/* Clear All Filters Button */}
            <div className="flex justify-between sticky top-0 left-0 bg-white pb-2 z-10">
                <h1 className="flex items-center gap-1 text-primary font-medium">
                    <Filter size={15} />Filter by
                </h1>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={clearAllFilters}
                >
                    Clear All
                </Button>
            </div>

            {/* Region Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="group flex w-full items-center justify-between font-semibold text-muted-foreground">
                    Region
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            "group-data-[state=open]:rotate-180"
                        )}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className={CollapsibleContentCSS}>
                    {
                        loading ?
                            <FilterMenuSkeleton />
                            :
                            <>
                                {data?.regions?.map((region) => (
                                    <div key={region.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={region.id}
                                            checked={filters.regionIds.includes(region.id)}
                                            onCheckedChange={() => toggleSelection("regionIds", region.id)}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor={region.id} className="text-sm cursor-pointer font-light">
                                            {region.name}
                                        </Label>
                                    </div>
                                ))}
                            </>
                    }
                </CollapsibleContent>
            </Collapsible>

            {/* Location Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="group flex w-full items-center justify-between font-semibold text-muted-foreground">
                    Location
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            "group-data-[state=open]:rotate-180"
                        )}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className={CollapsibleContentCSS}>
                    {
                        loading ?
                            <FilterMenuSkeleton />
                            :
                            <>
                                {data?.locations?.map((location) => (
                                    <div key={location.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={location.id}
                                            checked={filters.locationIds.includes(location.id)}
                                            onCheckedChange={() =>
                                                toggleSelection("locationIds", location.id)
                                            }
                                            className="cursor-pointer"
                                        />
                                        <Label
                                            htmlFor={location.id}
                                            className="text-sm cursor-pointer font-light"
                                        >
                                            {location.name}
                                        </Label>
                                    </div>
                                ))}
                            </>
                    }
                </CollapsibleContent>
            </Collapsible>

            {/* Price Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="group flex w-full items-center justify-between font-semibold text-muted-foreground">
                    Price
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            "group-data-[state=open]:rotate-180"
                        )}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className={CollapsibleContentCSS}>
                    {
                        loading ?
                            <FilterMenuSkeleton />
                            :
                            <>
                                {priceOptions.map((price) => (
                                    <div key={price.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={price.value}
                                            checked={filters.priceTag.includes(price.value)}
                                            onCheckedChange={() => toggleSelection("priceTag", price.value)}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor={price.value} className="text-sm cursor-pointer font-light">
                                            {price.label}
                                        </Label>
                                    </div>
                                ))}
                            </>
                    }
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export default FilterSideBar