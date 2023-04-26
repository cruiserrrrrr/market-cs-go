import { useSelector } from "react-redux";

export function useAuth() {
    const { email, token, id, telegramToken, userBalance, tgNoticeStatus } = useSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        id,
        telegramToken,
        userBalance, 
        tgNoticeStatus
    }
}