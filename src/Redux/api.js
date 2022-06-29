import axios from "axios";

// export const baseUrl = 'http://localhost:4000';
export const baseUrl = 'https://ecommercev0.herokuapp.com';


export const Login = async (admin) => {
    const { data } = await axios.post(
        `${baseUrl}/signin`,
        {
            email: admin.email,
            password: admin.password
        }
    );
    return data;
};
