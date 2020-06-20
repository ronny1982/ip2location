const fs = require('fs');

fs.readFile('./IP2LOCATION-LITE-DB1.CSV', 'utf-8', function(error, content) {
    const data = content.split('\n').map(line => {
        let parts = JSON.parse(`[${line}]`);
        return {
            from: parseInt(parts[0]),
            to: parseInt(parts[1]),
            code: parts[2],
            name: parts[3]
        };
    })
    .sort((a, b) => a.from - b.from);
    fs.writeFile('./IP2LOCATION-LITE-DB1.JSON', JSON.stringify(data), (error) => {});
});