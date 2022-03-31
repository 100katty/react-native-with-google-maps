import React, { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';


export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [routerLines, setRouterLines] = useState<Location[]>([])
    const [initialPosition, setInitialPosition] = useState<Location>();
    const [userLocation, setuserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0
    });
    const watchId = useRef<number>();
    const isMontend = useRef(true);

    useEffect(() => {
        isMontend.current = true;
        return () => {
            isMontend.current = false;
        }
    }, [])

    useEffect(() => {
        getCurrentLocation().then(location => {

            if (!isMontend.current) return;
            setInitialPosition(location);
            setHasLocation(true);
            setuserLocation(location);
            setRouterLines(routes => [...routerLines, location])
        })
    }, [])

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                },
                ((err) => reject(err)), { enableHighAccuracy: true }
            );
        });
    }
    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
                if (!isMontend.current) return;
                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setuserLocation(location)
                setRouterLines(routes => [...routerLines, location])
                console.log(routerLines);
            },
            ((err) => console.log(err)), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }
    const stopFollowUserLocation = () => {
        if (watchId.current)
            Geolocation.clearWatch(watchId.current);

    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routerLines
    }
}
