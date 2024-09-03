import { axiosApp } from "@/utils/axiosAPI";


export default class ReportService {
    async SalaryAverageAndAllinDepartmans() {
        try {
            const response = await axiosApp.get('SalaryAverageAndAllinDepartmans')
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async getSalaryStatistics() {
        try {
            const response = await axiosApp.get('getSalaryStatistics')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}