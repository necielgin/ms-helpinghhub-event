import supabase from '../config/db.js';

const getAllEvents = async () => {
    console.log("getting the list of all the different events")
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .select();

    if (error)  
    {
        console.log("there was an error in the request")
        throw error;
    }
    console.log("data was retrieved successfully")
    return data;
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

const createEvent = async (event) => {
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .insert(event)
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
    const { data, error } = await supabase
    .schema('HHTest')
    .from('Events')
    .update(event)
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

const deleteEvent = async (eventId) => {
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

export default { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
