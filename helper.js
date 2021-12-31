const rdl = require("readline-sync");
const fs = require("fs");
const colors = require("colors");




const helper = function helper() {

    /**
     * 
     * @param {string} filename 
     * @param {blob} data 
     * @returns {void}
     */

    this.saveToTxt = function(filename, data)
    {
        fs.appendFile(filename, data, (err) => {
            if(err) console.log("Error append file...");
        });
    }

    /**
     * 
     * @param {string} menu : menu yang akan ditampilkan
     * @param {string} question : prompt message
     * @returns {string|number}
     */
    this.read = function(question, menu="")
    {
        if (menu != "")
            console.log(menu);

        let q = rdl.question(this.message(question + ": ","warning"));
        return q;
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} t 
     * @returns {void}
     */

    this.message = function(msg, t="success", cons=false) {

        let msgg;
        msg = msg.trimLeft();

        switch(t)
        {
            case "error":
                msgg = colors.red("[x] " + msg);
                break;

            case "warning":
                msgg = colors.yellow("[!] " + msg);
                break;
        
            default:
                msgg = colors.green("[*] " + msg);
                break;

        }

        if (cons) {
            console.log(msgg);
        } else {
            return msgg;
        }
    }


}

module.exports = helper;

