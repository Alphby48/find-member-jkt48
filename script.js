import member from "./data-member.js";
import detail from "./member-detail.js";
const memReg = document.querySelector(".member-reguler");
const memTr = document.querySelector(".member-trainee");
const modalBody = document.querySelector(".modal-body");
const formFindMember = document.querySelector(".form-memeber");
const inputMember = document.querySelector(".input-member");
const memberBody = document.querySelector(".memb-body");

// add card member reguler

const memberReguler = showMember("Reguler");
memberReguler.forEach((m) => {
  memReg.innerHTML += memberSet(m);
});

// add card member trainee

const memberTrainee = showMember("Trainee");
memberTrainee.forEach((m) => {
  memTr.innerHTML += memberSet(m);
});

// add find member

formFindMember.addEventListener("submit", function (e) {
  e.preventDefault();
  const findMember = member.filter((m) =>
    m.name.toUpperCase().includes(inputMember.value.toUpperCase())
  );
  promiseFind(findMember);
  showUI(promiseFind);
});

// add modal card

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btnmember")) {
    const imdbid = e.target.dataset.imdbid;
    modalDetail(imdbid);
  }
});

// function

function promiseFind(findMember) {
  return new Promise((resolve, reject) => {
    if (findMember.length) {
      resolve(showFindUI(findMember));
    } else {
      reject(
        alert(
          `pencarian ' ${inputMember.value} ' tidak ada. gunakan nama panjang`
        )
      );
    }
  });
}

function showUI(promiseFind) {
  return promiseFind()
    .then((response) => response)
    .catch((response) => response);
}

function showFindUI(findMember) {
  const resultFind = findMember.map((fm) => memberSet(fm)).join("");
  memberBody.innerHTML = resultFind;
}

function modalDetail(imdbid) {
  const idMember = detail.filter((d) => d.id == imdbid);
  const resultMember = idMember.map((idm) => modalSet(idm));
  modalBody.innerHTML = resultMember;
}

function showMember(status) {
  return member.filter((mr) => mr.memberStatus.includes(status));
}

function memberSet(m) {
  return `<div class="w-auto m-2">
    <div class="card rounded-top-2" style="width: 15rem">
      <img
        src="${m.image}"
        class="card-img-top rounded-top-2"
        alt="..."
      />
      <div class="card-body bg-danger-subtle rounded-bottom-2">
        <h5 class="card-title">${m.name}</h5>
        <p class="card-text">Status Member : ${m.memberStatus}</p>
        <a
          href="#"
          class="btn btn-primary btnmember"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-imdbid="${m.id}"
          >Detail</a
        >
      </div>
    </div>
  </div>`;
}

function modalSet(m) {
  return ` <div class="d-flex flex-wrap justify-content-around w-100">
    <div class="">
      <img
        src="${m.image}"
        class="mb-2"
        alt=""
      />
    </div>
    <div class="">
      <h4>Nama : ${m.fullName}</h4>
      <p>Panggilan : ${m.nickname}</p>
      <p>Tanggal Lahir : ${m.birthday}</p>
      <p>Umur : ${calculateAge(m.birthday)}</p>
      <p>Gol. Darah : ${m.bloodType}</p>
      <p>Zodiac : ${m.zodiac}</p>
      <p>Tinggi : ${m.height}</p>
    </div>
  </div>`;
}

//

const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const [day, monthName, year] = dateOfBirth.split(" ");
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Ubah format string tanggal lahir ke objek Date yang dapat diinterpretasikan
  const birthMonth = monthNames.indexOf(monthName);
  const birthDate = new Date(year, birthMonth, parseInt(day, 10));

  // Hitung umur
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Contoh penggunaan
// const tanggalLahir = "14 Agustus 2005"; // Ganti dengan tanggal lahir yang sesuai
// const umur = calculateAge(tanggalLahir);
// console.log(`Umur: ${umur} Tahun`);
