"use client";

import moment from "moment";
import { FaStar } from "react-icons/fa";
import { Review } from "@/api/hook/dashboard/resturant/schema";
import { calculateAverageRating } from "@/lib/functions/_helper.lib";
import ReviewPhotogallery from "@/components/global/PhotoGallery/ReviewPhotogallery";

interface RestaurantReviewsProps {
    data: Review[] | null;
}

const RestaurantReviews = ({ data }: RestaurantReviewsProps) => {
    
    if (!data || data.length === 0) {
        return (
            <div className="my-10 text-center text-muted-foreground">
                <p>No reviews yet. Be the first to leave one!</p>
            </div>
        );
    }

    const averageRating = calculateAverageRating(data);

    return (
        <div className="my-12">

            {/* ====== Header with Avg Rating ====== */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                {/* Average Rating Card */}
                <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 w-full md:w-1/3">
                    <h2 className="text-5xl font-bold text-yellow-500">
                        {averageRating.toFixed(1)}
                    </h2>
                    <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <FaStar
                                key={idx}
                                size={20}
                                className={
                                    idx < Math.round(averageRating)
                                        ? "text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                }
                            />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        Based on {data.length}{" "}
                        {data.length === 1 ? "review" : "reviews"}
                    </p>
                </div>

                {/* Ratings Breakdown */}
                <div className="flex-1 w-full">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = data.filter(
                            (review) => Math.round(review.rating) === star
                        ).length;
                        const percentage = (count / data.length) * 100;

                        return (
                            <div key={star} className="flex items-center gap-3 mb-2">
                                <span className="flex items-center gap-1 text-sm w-12">
                                    {star}
                                    <FaStar className="text-yellow-400" size={14} />
                                </span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                                    <div
                                        className="bg-yellow-400 h-3 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground w-10 text-right">
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold mb-2">All Reviews</h1>
                {/* ====== Reviews List ====== */}
                <div className="space-y-6">
                    {data.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3"
                        >
                            {/* Reviewer Info */}
                            <div className="flex items-start gap-3 mb-2">
                                {/* Avatar Circle with Initial */}
                                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-600 font-bold text-sm">
                                    {review.full_name.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">{review.full_name}</h3>

                                    {/* Rating + Date inline under name */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, idx) => (
                                                <FaStar
                                                    key={idx}
                                                    size={12}
                                                    className={
                                                        idx < Math.round(review.rating)
                                                            ? "text-yellow-400"
                                                            : "text-gray-300 dark:text-gray-600"
                                                    }
                                                />
                                            ))}
                                            <span className="ml-1 font-medium">{review.rating.toFixed(1)}</span>
                                        </div>
                                        <span>·</span>
                                        <span>{moment(review.created_at).format("Do MMMM, YYYY")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                                {review.description}
                            </p>

                            <ReviewPhotogallery />
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default RestaurantReviews;
