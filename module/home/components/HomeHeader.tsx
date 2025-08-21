"use client"
import { useState } from "react"
import { redirect } from "next/navigation"
import { PAGE_PATHS } from "@/lib/pagePath"
import SearchComponent from "@/components/global/search/SearchComponent"

const HomeHeader = () => {

    const [queryValue, setQueryValue] = useState<string>("");

    const handleOnSearch = () => {
        if(queryValue){
            redirect(`${PAGE_PATHS.search}?searchQuery=${queryValue}`)
        }
    }

    return (
        <div className="w-full h-[180px] bg-gradient-to-r from-slate-500 to-slate-800 flex flex-col justify-center items-center gap-5">
            <h1 className="text-3xl font-bold text-white">
                Find your table for any occasion
            </h1>
            <SearchComponent
                value={queryValue}
                onChange={setQueryValue}
                onSearch={handleOnSearch}
            />
        </div>
    )
}

export default HomeHeader
