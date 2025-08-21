"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, CalendarIcon, ChartNoAxesCombined, Clock, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ReservationBox = () => {

    const [people, setPeople] = useState<number>(2);
    const [time, setTime] = useState<string>("7:30 PM");
    const [date, setDate] = useState<Date | undefined>(new Date());

    const times = ["7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM"];
    const notifyTime = "8:30 PM";

    return (
        <div className="w-[400px] border rounded-lg p-4">
            <h1 className="text-xl font-medium mb-4">Make a reservation</h1>

            <div className="w-full grid grid-cols-2 gap-4">
                {/* Time Selector - Dropdown */}
                <div className="mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                <Clock className="mr-2 h-4 w-4" />
                                {time}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                            {times.map((t) => (
                                <DropdownMenuItem key={t} onClick={() => setTime(t)}>
                                    {t}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* People Selector - Dropdown */}
                <div className="mb-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                <Users className="mr-2 h-4 w-4" />
                                {people} {people === 1 ? "person" : "people"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                            {[1, 2, 3, 4, 5, 6].map((p) => (
                                <DropdownMenuItem key={p} onClick={() => setPeople(p)}>
                                    {p} {p === 1 ? "person" : "people"}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Date Picker */}
            <div className="mb-3">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Available Times */}
            <div>
                <p className="text-sm font-medium mb-2">Select a time</p>
                <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                        <Button
                            key={t}
                            variant={time === t ? "default" : "outline"}
                            onClick={() => setTime(t)}
                        >
                            {t}
                        </Button>
                    ))}
                    {/* Notify Me option */}
                    <Button variant="outline" className="flex items-center gap-1">
                        <Bell className="h-4 w-4" /> Notify me
                    </Button>
                </div>
            </div>

            {/* Extra info */}
            <div className="mt-6 text-sm text-gray-500 space-y-1">
                <p className="flex items-center gap-2">
                    <ChartNoAxesCombined className="h-4 w-4" /> Booked 39 times today
                </p>
                <p>
                    Experiences are available.{" "}
                    <span className="text-red-500 cursor-pointer">See details</span>
                </p>
            </div>
        </div>
    );
};

export default ReservationBox;
