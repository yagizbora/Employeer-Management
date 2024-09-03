<script setup>
import { defineAsyncComponent,ref } from 'vue';
import ReportService from "@/service/ReportService";
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const SalaryReportTable = defineAsyncComponent(() => import('./SalaryReportTable.vue'));
const reportservice = new ReportService();
const data = ref([])

const FetchData = async () => {
    try {
        const response = await reportservice.SalaryAverageAndAllinDepartmans();
        data.value = response.data
        console.log(response);
    } catch (error) {
        console.error(error)
    }
}

const downloadExcel = async () => {
    try {
        // API'den veri çek
        const response = await reportservice.SalaryAverageAndAllinDepartmans();
        const data = response.data; // API yanıtındaki veriyi alın

        // Veri kontrolü
        if (!data || !Array.isArray(data) || data.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'No data to download',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Excel dosyası oluşturma
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Salary Report');

        // Başlıklar
        worksheet.columns = [
            { header: 'Departman', key: 'Departman', width: 20 },
            { header: 'Average Salary', key: 'AverageSalary', width: 15 },
            { header: 'Total Salary', key: 'TotalSalary', width: 15 },
            { header: 'Employee Name', key: 'Name', width: 25 },
            { header: 'Salary', key: 'Salary', width: 15 },
            { header: 'Position', key: 'Position', width: 25 }
        ];

        // Verileri ekleme
        data.forEach(department => {
            // Departman bilgilerini yaz
            worksheet.addRow({
                Departman: department.Departman,
                AverageSalary: department.AverageSalary,
                TotalSalary: department.TotalSalary
            });

            // Çalışanları ekle
            department.Employeers.forEach(employee => {
                worksheet.addRow({
                    Name: employee.Name,
                    Salary: employee.Salary,
                    Position: employee.Position
                });
            });

            // Görsellik için boş satır ekle
            worksheet.addRow({});
        });

        // Excel dosyasını oluştur ve indir
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'SalaryReport.xlsx');

    } catch (error) {
        console.error('Error generating Excel:', error);
        Swal.fire({
            title: 'Error',
            text: 'Failed to generate Excel file',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
};



onMounted(FetchData);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between align-content-center">
                    <div class="card-header">
                        <h4>Salary Report</h4>
                    </div>
                    <div>
                        <Button label="Excel" @click="downloadExcel"></Button>
                    </div>
                </div>
                <div class="card-body">
                    <SalaryReportTable :data="data" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss"></style>