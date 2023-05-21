'use client'

import React, {useCallback, useMemo} from 'react';
import {SafeListing, SafeReservation, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {format as formatDate} from 'date-fns'
import Image from "next/image";
import HeartButton from "@/app/components/ui/HeartButton";
import Button from "@/app/components/ui/Button";

interface ListingCardProps {
    data: SafeListing
    reservation?: SafeReservation
    currentUser?: SafeUser | null
    onAction?: (id: string) => void
    actionLabel?: string
    actionId?: string
    disabled?: boolean
}

const ListingCard = ({
                         data,
                         reservation,
                         currentUser,
                         onAction,
                         actionId = "",
                         actionLabel,
                         disabled
                     }: ListingCardProps) => {
    const router = useRouter()
    const {getByValue} = useCountries()

    // get whole location object
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${formatDate(start, 'PP')} - ${formatDate(end, 'PP')}`;
    }, [reservation]);

    return (
        <div onClick={() => router.push(`/listings/${data.id}`)}
             className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full" >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl" >
                    <Image fill className="object-cover h-full w-full group-hover:scale-110 transition"
                           src={data.imageSrc}
                           alt="Listing"
                    />
                    <div className="absolute top-3 right-3" >
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div >
                </div >
                <div className="font-semibold text-lg" >
                    {location?.region}, {location?.label}
                </div >
                <div className="font-light text-neutral-500" >
                    {reservationDate || data.category}
                </div >
                <div className="flex flex-row items-center gap-1" >
                    <div className="font-semibold" >
                        $ {price}
                    </div >
                    {!reservation && (
                        <div className="font-light" >night</div >
                    )}
                </div >
                {onAction && actionLabel && (
                    <Button disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                    />
                )}
            </div >
        </div >
    );
};

export default ListingCard;
