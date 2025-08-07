class App {
    static open() {
        document.body.innerHTML = `    <div id="wrapper">
        <div class="header">
            <div class="left"><a href="https://github.com/1Xyz0/executor" target="_blank">GITHUB</a></div>
            <div class="right"><a href="https://github.com/1Xyz0" target="_blank" rel="noopener noreferrer">Made By 1Xyz0</a></div>
        </div>
        <div id="codeBlock">
            <textarea id="code" rows="10" cols="50" placeholder="write code here.."></textarea>
        </div>
        <div class="options">
            <div class="option"><button class="client" id="execute">execute to client</button></div>
        </div>
    </div>`;


        document.getElementById("execute").addEventListener("click", (event) => {
            let code = document.getElementById("code").value;
            fetch(`https://${GetParentResourceName()}/xyz-executor:code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    code: code,
                })
            })
        })

        document.getElementById("code").addEventListener("keydown", function(e) {
            if (e.key === "Tab") {
                e.preventDefault(); 

                const start = this.selectionStart;
                const end = this.selectionEnd;

                const tab = "    ";

                this.value = this.value.substring(0, start) + tab + this.value.substring(end);

                this.selectionStart = this.selectionEnd = start + tab.length;
            }
        });
    }

    static close() {
        document.body.innerHTML = "";
        fetch(`https://${GetParentResourceName()}/xyz-executor:close`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                close: true
            })
        })
    }
}



addEventListener("message", (event) => {
    const e = event.data;

    if (e.action == "open")
    {
        App.open();
    }
    else if (e.action == "close")
    {
        App.close();
    }
})



addEventListener("keydown", function(event)
{
    if (event.keyCode == 27)
    {
        App.close();
    }
})