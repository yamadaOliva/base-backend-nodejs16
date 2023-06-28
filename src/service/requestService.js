import db from '../models/index';

const createRequest = async (request) => {
    
    try {
        await db.Booking.create({
            user_id: request.user_id,
            maid_id: request.maid_id,
            start_date: request.start_date,
            end_date: request.end_date,
            price: request.price,
            status: request.status,
            cancel_reason: request.cancel_reason
        })
        return {
            EC : 200,
            EM : 'Create request successfully',
            DT : ""
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createRequest
}