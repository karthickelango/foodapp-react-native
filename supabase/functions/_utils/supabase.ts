import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { stripe } from './stripe.ts';

export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
            global: {
                headers: { Authorization: req.headers.get('Authorization')! },
            },
        }
    );
    // Now we can get the session or user object
    const {
        data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) throw new Error('No user found');
    const {data: profile, error} = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
    if(error || !profile) {
        throw new Error('profile not found');
    }
    if(profile.stripe_customer_id) {
        return profile.stripe_customer_id
    }
    // create stripe customer
    // const customer = await stripe.customers.create({
    //     email: user.email,
    //     metadatea: {uid: user.id}
    // })


    // await supabaseClient.from('profile').update({stripe_customer_id : customer.id}).eq('id', profile.id)
    // return customer.id
};