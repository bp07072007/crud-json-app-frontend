export default class ContactService {
    static async AddContact(params) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/get`);
        setData(response.data.data);
      } catch (error) {
        const err = {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: ERR_CODES[500].message,
          phase: "ContactService -- AddContact function",
        };
        throw err;
      }
    }

}