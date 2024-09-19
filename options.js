document.addEventListener('DOMContentLoaded', () => {
    console.log('options.js loaded');

    document.getElementById('uploadButton').addEventListener('click', async () => {
        console.log('Upload button clicked');
        const fileInput = document.getElementById('yamlFile');
        const file = fileInput.files[0];

        if (file) {
            console.log('File selected:', file.name);
            const reader = new FileReader();
            reader.onload = async (event) => {
                const yamlText = event.target.result;
                console.log('File content:', yamlText);

                try {
                    const parsedData = jsyaml.load(yamlText);
                    console.log('Parsed data:', parsedData);

                    // Ensure accounts is an array
                    const accounts = Array.isArray(parsedData.accounts) ? parsedData.accounts : Object.values(parsedData.accounts);
                    console.log('Accounts to store:', accounts);

                    // Store the parsed data in browser storage
                    await browser.storage.local.set({ accounts });
                    alert('YAML file uploaded and parsed successfully!');
                } catch (error) {
                    console.error('Error parsing YAML file:', error);
                    alert('Failed to parse YAML file.');
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please select a file to upload.');
        }
    });
});