var files = document.querySelector('.PDFs');
function readFiles() {
    fetch('./moved_files.json')
    .then(res => {
        if (!res.ok) {
            files.innerHtml = res.ok
        }
        return res.json();
    })
    .then(data => {
        
        var movedFiles = data['moved_files'];

        var magazine = [];
        var DC = [];
        var DS = [];
        var Physique = [];
        var DSynthese = [];
        var Fiche_methode = [];
        var Cours = [];
        var Principale = [];
        var resume = [];
        var Controle = [];
        var other = [];
        var Title = ["Magazine", "Devoir Controle", "Devoir Synthese", "Physique", "Synthese", "Fiche Methode", "Cours", "Resume", "Controle", "Principale", "Autres"];

        // Categorize files
        for (var i = 0; i < movedFiles.length; i++) {
            var file = movedFiles[i].toLowerCase();
            if (file.includes('magazine') || file.includes('_magazine')) {
                magazine.push(movedFiles[i]);
            } else if (file.includes('dc')) {
                DC.push(movedFiles[i]);
            } else if (file.includes('ds')) {
                DS.push(movedFiles[i]);
            } else if (file.includes('physique') || file.includes('phy')) {
                Physique.push(movedFiles[i]);
            } else if (file.includes('synthese')) {
                DSynthese.push(movedFiles[i]);
            } else if (file.includes('fiche methode')) {
                Fiche_methode.push(movedFiles[i]);
            } else if (file.includes('cours')) {
                Cours.push(movedFiles[i]);
            } else if (file.includes('principale')) {
                Principale.push(movedFiles[i]);
            } else if (file.includes('résumé')) {
                resume.push(movedFiles[i]);
            } else if (file.includes('controle')) {
                Controle.push(movedFiles[i]);
            } else {
                other.push(movedFiles[i]);
            }
        }

        // Function to get file size
        function getFileSize(file) {
            return fetch(`./PDF/${file}`, { method: 'HEAD' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.headers.get('Content-Length');
                })
                .then(size => {
                    if (size) {
                        size = parseInt(size);
                        if (size > 1024 * 1024) {
                            return (size / (1024 * 1024)).toFixed(2) + ' MB';
                        } else {
                            return (size / 1024).toFixed(2) + ' KB';
                        }
                    } else {
                        return 'Unknown size';
                    }
                })
                .catch(error => {
                    console.error('Error fetching file size:', error);
                    return 'Error fetching size';
                });
        }

        // Generate HTML for each category
        function generateCategoryHTML(category, title) {
            if (category.length === 0) return '';

            var html = `
                <h1 class="Titles">${title}</h1>
                <div class="box">`;
            
            for (var i = 0; i < category.length; i++) {
                html += `
                    <div class="pdfBox">
                        <div class="name">${category[i].replace(/.pdf/g, '')}</div>
                        <div class="fileTialle" id="file-size-${i}">Fetching size...</div>
                        <div class="buttons">
                            <a class="links vi" target="_blank" href="./PDF/${category[i]}"><i class="fa fa-eye"></i></a>
                            <a class="links do" download="${category[i]}" href="./PDF/${category[i]}"><i class="fa fa-file-arrow-down"></i></a>
                        </div>
                        <div class="profile">
                            <img src="/images/photo_pro.jpg" alt="" height="45" width="45">
                            <a href="https://www.facebook.com/jasser.razzek.3/" target="_blank" class="name_pro">Jâssêr Bén Âbęd Rãzzęk</a>
                        </div>
                    </div>`;
            }

            html += `</div>`;
            return html;
        }

        // Combine all HTML and set it to the .PDFs element
        var allHTML = '';
        allHTML += generateCategoryHTML(magazine, Title[0]);
        allHTML += generateCategoryHTML(DC, Title[1]);
        allHTML += generateCategoryHTML(DS, Title[2]);
        allHTML += generateCategoryHTML(Physique, Title[3]);
        allHTML += generateCategoryHTML(DSynthese, Title[4]);
        allHTML += generateCategoryHTML(Fiche_methode, Title[5]);
        allHTML += generateCategoryHTML(Cours, Title[6]);
        allHTML += generateCategoryHTML(resume, Title[7]);
        allHTML += generateCategoryHTML(Controle, Title[8]);
        allHTML += generateCategoryHTML(Principale, Title[9]);
        allHTML += generateCategoryHTML(other, Title[10]);

        files.innerHTML = allHTML;

        // Fetch file sizes and update HTML
        var allFiles = [...magazine, ...DC, ...DS, ...Physique, ...DSynthese, ...Fiche_methode, ...Cours, ...resume, ...Controle, ...Principale, ...other];
        allFiles.forEach((file, index) => {
            getFileSize(file).then(size => {
                document.getElementById(`file-size-${index}`).innerText = size;
            });
        });
    })
    .catch(err => {
        console.error(err);
    });
}

readFiles();
