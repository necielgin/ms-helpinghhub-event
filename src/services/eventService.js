import supabase from '../config/db.js';
import {geoCoderAddress} from './geocoder.js';

const getAllEvents = async () => {
    console.log("getting the list of all the different events")
    const { data, error, count } = await supabase
    .schema('HHTest')
    .from('Events')
    .select('*', { count: 'exact' });

    if (error)  
    {
        console.log("there was an error in the request")
        throw error;
    }
    console.log("data was retrieved successfully")
    return {
        events: data,
        count: data.length,
    }
};

const getEventById = async (eventId) => {
    console.log("getting event with id: ",eventId)
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .select('*')
    .eq('id', eventId)
    .single();

    if (error)  
        {
            console.log("there was an error in the request")
            throw error;
        }

    console.log("data was retrieved successfully")
    return data;
}

const getEventByLocation = async (location) => {
    console.log("Getting events for location: ", location);

    try {
        // Geocode the address to get lat/lon
        const geoCodedAddress = await geoCoderAddress(location);

        if (!geoCodedAddress || geoCodedAddress.length === 0) {
            throw new Error("Invalid location provided.");
        }

        const city = location; // Store the input city name
        const coordinates = {
            latitude: geoCodedAddress[0].latitude,
            longitude: geoCodedAddress[0].longitude,
        };

        // Call the Supabase function
        const { data, error } = await supabase
        .rpc('get_events_nearby', {
            p_lat: coordinates.latitude,
            p_lon: coordinates.longitude,
            p_radius_miles: 25,
        });

        if (error) {
            console.error("Supabase RPC error:", error);
            throw error;
        }

        console.log("Data retrieved successfully:", data);

        return {
            events: data,
            count: data.length,
        };
    } catch (err) {
        console.error("Error in getEventByLocation:", err);
        throw err;
    }
};


const createEvent = async (event) => {
    const geoCodedAddress = await geoCoderAddress(event.address);
    const insertEvent = {
        ...event,
        latitude:geoCodedAddress[0].latitude,
        longitude:geoCodedAddress[0].longitude,
    }
    console.log("inserting event: ",insertEvent)
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .insert(insertEvent)
    .select();

    if (error)  
    {
        console.log("there was an error in the request")
        throw error;
    }
    console.log("data was retrieved successfully")
    return data;
}

const updateEvent = async (eventId, event) => {
    let updateEvent = event;
    if(event.address)
    {
        let geoCodedAddress = await geoCoderAddress(event.address);
        updateEvent = {
            ...event,
            latitude:geoCodedAddress[0].latitude,
            longitude:geoCodedAddress[0].longitude,
        }
    }
    console.log("updating event with id: ",eventId)
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .update(updateEvent)
    .eq('id', eventId)
    .select();

    if (error)  
    {
        console.log("there was an error in the request")
        throw error;
    }

    if(data.length === 0)
    {
        console.log("no event was found with that id")
        return null;
    }

    console.log("data was retrieved successfully")
    return data;
}

export const deleteEvent = async (eventId) => {
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .delete()
    .eq('id', eventId)
    .select();

    if (error)  
    {
        console.log("there was an error in the request")
        throw error;
    }

    if(data.length === 0)
        {
            console.log("no event was found with that id")
            return null;
        }


    console.log("data was retrieved successfully")
    return data;
}

export default { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventByLocation };
