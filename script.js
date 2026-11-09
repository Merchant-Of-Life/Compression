const imageinput = document.getElementById('imageinput');
const fileinfo = document.getElementById('fileinfo');
const preview = document.getElementById('preview');


imageinput.addEventListener('change', function () {
    const file = imageinput.files[0];
    fileinfo.innerText = "selected: " + file.name + " (" + Math.round(file.size / 1024) + "KB";
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
});