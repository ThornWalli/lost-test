import fs from 'fs';
import postcss from 'postcss';
import lost from 'lost';
import postcssPresetEnv from 'postcss-preset-env';

const css = await fs.promises.readFile('./style.pcss');

postcss([
        postcssPresetEnv({
            stage: 0
        }), 
        lost // Remove for correct result.
    ])
    .process(css, { from: './style.pcss', to: './dest/style.css' })
    .then(async result => {
        await fs.promises.mkdir('./dest', {recursive: true});
        return fs.promises.writeFile('./dest/style.css', result.css, () => true)
        if (result.map) {
            fs.writeFile('./dest/app.css.map', result.map.toString(), () => true)
        }
    })
