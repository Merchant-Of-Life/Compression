const imageinput = document.getElementById('imageinput');
const fileinfo = document.getElementById('fileinfo');
const preview = document.getElementById('preview');

const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');

const compressBtn = document.getElementById('compressBtn');
const compressedPreview = document.getElementById('compressedPreview');
const compressedInfo = document.getElementById('compressedInfo');

const downloadBtn = document.getElementById('downloadBtn');
const dropzone = document.getElementById('dropzone');

const compareSlider = document.getElementById('compareSlider');
const divider = document.getElementById('divider');

imageinput.addEventListener('change', function () {
    const file = imageinput.files[0];
    if (file) {
        fileinfo.innerText = 'Selected:' + file.name + ' (' + Math.round(file.size/ 1024) + "KB)";
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

qualitySlider.addEventListener('input', function () {
    qualityValue.innerText = qualitySlider.value;
});

compressBtn.addEventListener('click', function () {
    if (!preview.src) {
        alert("Select A Image First!");
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight
    ctx.drawImage(preview, 0, 0);

    const quality = qualitySlider.value / 100;

    canvas.toBlob(function (blob) {
        const compressedUrl = URL.createObjectURL(blob);
        compressedPreview.src = compressedUrl;
        compressedPreview.style.display = 'block';

        const newSizeKB = Math.round(blob.size / 1024);
        compressedInfo.innerText = "compressed Size" + newSizeKB + ' Kb (' + qualitySlider.value + "% Quality)";
        
        downloadBtn.href = compressedUrl;
        downloadBtn.download = 'compressed_' + imageinput.files[0].name;
        downloadBtn.style.display = 'inline-block';
    },  'image/jpeg', quality);
    });

    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropzone.style.borderColor = '#C1A0AC';
    });

    dropzone.addEventListener('dragleave', function () {
        dropzone.style.borderColor = '#806C79';
    
    });

    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.style.borderColor = "#806C79";
        if (e.dataTransfer.files.length > 0) {
            imageinput.files = e.dataTransfer.files;
            imageinput.dispatchEvent(new Event('change'));
        }
    });

    compareSlider.addEventListener('input', function () {
        const val = compareSlider.value;
        compressedPreview.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
        divider.style.left = val + "%";   
    });