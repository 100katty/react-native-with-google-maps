import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: Marker[];
}


export const Map = ({ markers }: Props) => {

    const { routerLines, stopFollowUserLocation, userLocation, hasLocation, initialPosition, getCurrentLocation, followUserLocation
    } = useLocation();
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);
    const [showPoline, setshowPoline] = useState(true);

    useEffect(() => {
        if (!following.current) return;
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, [])
    useEffect(() => {
        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });

    }, [userLocation])


    const centerPossition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        following.current = true;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }
    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {/*
              <Marker
                  image={ require('../assets/custom-marker.png')}
                  coordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                  }}
                  title='hola'
                  description='hola'
              />
             */}
                {
                    showPoline && (
                        <Polyline
                            coordinates={routerLines}
                            strokeColor='black'
                            strokeWidth={3}

                        />
                    )
                }

            </MapView>
            <Fab
                iconName='compass-outline'
                onPress={centerPossition}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10
                }}

            />
            <Fab
                iconName='brush-outline'
                onPress={() => setshowPoline(!showPoline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 10
                }}

            />

        </>
    )
}
