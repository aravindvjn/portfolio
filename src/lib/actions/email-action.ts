'use server'
import { sendEmail } from "../helpers/send-mail";

export type PrevStateType = {
    success: boolean;
    message: string;
    data?: {
        content: string;
        email: string;
    }
}
export const sendEmailAction = async (prevState: PrevStateType, formData: FormData) => {

    const content = formData.get("content") as string;
    const email = formData.get("email") as string;

    prevState = {
        ...prevState,
        data: {
            content,
            email
        },
        success: false
    }

    if (!content.trim() || !email.trim()) {
        return {
            ...prevState,
            message: "All fields are required."
        }
    }
    try {


        const res = await sendEmail(email, content);
        return {
            ...prevState,
            ...res,
            data: res.success ? {
                content: "",
                email: ""
            } : prevState.data
        }

    } catch {
        return {
            ...prevState,
            message: "Server not responding."
        }
    }

}