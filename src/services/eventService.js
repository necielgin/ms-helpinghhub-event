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

export default { getAllEvents, getEventById };
