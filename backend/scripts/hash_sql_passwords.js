import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const sqlPath = path.resolve('../../papeleria_lapizito.sql');

function splitFields(s) {
    const fields = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "'") {
            if (inQuotes && s[i+1] === "'") {
                cur += "''";
                i++;
                continue;
            }
            inQuotes = !inQuotes;
            cur += ch;
            continue;
        }
        if (ch === ',' && !inQuotes) {
            fields.push(cur.trim());
            cur = '';
            continue;
        }
        cur += ch;
    }
    if (cur.length) fields.push(cur.trim());
    return fields;
}

try {
    if (!fs.existsSync(sqlPath)) {
        console.error('SQL file not found at', sqlPath);
        process.exit(1);
    }

    const original = fs.readFileSync(sqlPath, 'utf8');
    const insertRegex = /INSERT INTO `usuario` \(([^)]+)\) VALUES\s*([\s\S]*?);/m;
    const match = original.match(insertRegex);
    if (!match) {
        console.error('No se encontró un INSERT INTO `usuario` con VALUES en el SQL.');
        process.exit(1);
    }

    const colsRaw = match[1];
    const valuesRaw = match[2];
    const cols = colsRaw.split(',').map(c => c.replace(/`/g,'').trim());
    const idx = cols.findIndex(c => c === 'contrasenia');
    if (idx === -1) {
        console.error('No se encontró la columna contrasenia en el INSERT. Columnas:', cols);
        process.exit(1);
    }

    const tupleRegex = /\(([^)]*)\)/g;
    const tuples = [];
    let m;
    while ((m = tupleRegex.exec(valuesRaw)) !== null) {
        tuples.push(m[1]);
    }

    if (tuples.length === 0) {
        console.error('No se encontraron tuplas en VALUES.');
        process.exit(1);
    }

    const newTuples = tuples.map(t => {
        const fields = splitFields(t);
        if (idx >= fields.length) return '(' + t + ')';
        let passField = fields[idx];
        const isString = /^'(.*)'$/s.test(passField);
        const rawPass = isString ? passField.replace(/^'(.*)'$/s, "$1") : passField;
        const unescaped = rawPass.replace(/''/g, "'");
        const hash = bcrypt.hashSync(unescaped, 10);
        const hashSql = "'" + hash.replace(/'/g, "''") + "'";
        fields[idx] = hashSql;
        return '(' + fields.join(', ') + ')';
    });

    const newValuesBlock = newTuples.join(',\n');
    const newSql = original.replace(insertRegex, `INSERT INTO \`usuario\` (${colsRaw}) VALUES\n${newValuesBlock};`);

    fs.copyFileSync(sqlPath, sqlPath + '.bak');
    fs.writeFileSync(sqlPath, newSql, 'utf8');
    console.log('Actualizado', sqlPath, '- copia de seguridad creada en .bak');
} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
