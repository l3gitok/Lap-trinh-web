class SinhVien {
    constructor(masinhvien, hoten, gioitinh, ngaysinh, quequan) {
        this.masinhvien = masinhvien;
        this.hoten = hoten;
        this.gioitinh = gioitinh;
        this.ngaysinh = ngaysinh;
        this.quequan = quequan;
    }
}

class QuanLySinhVien {
    constructor() {
        this.sinhvien = [];
        this.loadFromStorage();
        this.hienThiDanhSach();
    }

    loadFromStorage() {
        if (localStorage.sinhvien) {
            this.sinhvien = JSON.parse(localStorage.sinhvien);
        }
    }

    saveToStorage() {
        localStorage.sinhvien = JSON.stringify(this.sinhvien);
    }

    themSinhVien(sinhvien) {
        this.sinhvien.push(sinhvien);
        this.saveToStorage();
        this.hienThiDanhSach();
    }

    suaSinhVien(masinhvien, hoten, gioitinh, ngaysinh, quequan) {
        let index = this.sinhvien.findIndex(sv => sv.masinhvien === masinhvien);
        if (index !== -1) {
            this.sinhvien[index] = new SinhVien(masinhvien, hoten, gioitinh, ngaysinh, quequan);
            this.saveToStorage();
            this.hienThiDanhSach();
        }
    }

    xoaSinhVien(masinhvien) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            this.sinhvien = this.sinhvien.filter(sv => sv.masinhvien !== masinhvien);
            this.saveToStorage();
            this.hienThiDanhSach();
        }
    }

    hienThiDanhSach() {
        let tbody = document.getElementById('danhSachSinhVien');
        tbody.innerHTML = '';
        this.sinhvien.forEach(sv => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${sv.masinhvien}</td>
                <td>${sv.hoten}</td>
                <td>${sv.gioitinh}</td>
                <td>${sv.ngaysinh}</td>
                <td>${sv.quequan}</td>
                <td>
                    <button onclick="openEditModal('${sv.masinhvien}')">Sửa</button>
                    <button onclick="quanLySinhVien.xoaSinhVien('${sv.masinhvien}')">Xóa</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

let quanLySinhVien = new QuanLySinhVien();

document.getElementById('formSinhVien').onsubmit = function(event) {
    event.preventDefault();
    let masinhvien = document.getElementById('masinhvien').value;
    let hoten = document.getElementById('hoten').value;
    let gioitinh = document.getElementById('gioitinh').value;
    let ngaysinh = document.getElementById('ngaysinh').value;
    let quequan = document.getElementById('quequan').value;
    let sinhvien = new SinhVien(masinhvien, hoten, gioitinh, ngaysinh, quequan);
    quanLySinhVien.themSinhVien(sinhvien);
    this.reset();
};

function openEditModal(masinhvien) {
    let sinhVien = quanLySinhVien.sinhvien.find(sv => sv.masinhvien === masinhvien);
    if (sinhVien) {
        document.getElementById('editMasinhvien').value = sinhVien.masinhvien;
        document.getElementById('editHoten').value = sinhVien.hoten;
        document.getElementById('editGioitinh').value = sinhVien.gioitinh;
        document.getElementById('editNgaysinh').value = sinhVien.ngaysinh;
        document.getElementById('editQuequan').value = sinhVien.quequan;

        document.getElementById('myModal').style.display = "block";
    }
}


document.querySelector('.close').onclick = function() {
    document.getElementById('myModal').style.display = "none";
}


document.getElementById('saveChanges').onclick = function() {
    let masinhvien = document.getElementById('editMasinhvien').value;
    let hoten = document.getElementById('editHoten').value;
    let gioitinh = document.getElementById('editGioitinh').value;
    let ngaysinh = document.getElementById('editNgaysinh').value;
    let quequan = document.getElementById('editQuequan').value;

    quanLySinhVien.suaSinhVien(masinhvien, hoten, gioitinh, ngaysinh, quequan);
    document.getElementById('myModal').style.display = "none";
}


window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}
document.getElementById('ngaysinh').max = new Date().toISOString().split("T")[0];
document.getElementById('editNgaysinh').max = new Date().toISOString().split("T")[0];
