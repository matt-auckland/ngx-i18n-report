# ngx-i18n-report

The purpose of this package is to generate reports on the # of translated lines you have annotated with `i18n` in your ngx project.

## Use 
  - Save as a dev depend:
    `npm i ngx-i18n-report --save-dev `  
  - Add to your `package.json`'s `scripts`  
    ```json
      scripts: {
        "i18n-report": "ngx-i18n-report [path-to-folder] [base-file]"
      }
    ```
      - `path-to-folder` is the path to the folder that contains your `.xlf` files
      - `base-file` is filename of base translation file without the `.xlf` file extension (usually called `messages.xlf`)
        ```json
        scripts: {
          "i18n-report": "ngx-i18n-report /locale/ messages"
        }
        ```
  - `npm run i18n-report`

## Example Report

```
Filename: messages.en.xlf
  Untranslated Lines Count: 0
  Translation Completion: 100%

Filename: messages.ja.xlf
  Untranslated Lines Count: 7
  Translation Completion: 36%

Filename: messages.de.xlf
  Untranslated Lines Count: 8
  Translation Completion: 27%
  ```

## To Do
- Allow reports to be saved as json or txt files
- Make reports prettier
- Add error handling
- Add command line instructions