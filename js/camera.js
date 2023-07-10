
        /**
         * [onload] カメラを<video>と同期
         */
         function syncCamera() {
            navigator.mediaDevices.getUserMedia(CONSTRAINTS)
                .then((stream) => {
                    VIDEO.srcObject = stream;
                    VIDEO.onloadedmetadata = (e) => {
                        VIDEO.play();
                    };
                })
                .catch((err) => {
                    console.log(`${err.name}: ${err.message}`);
                });
        }

        /**
         * [onload] フレーム一覧を表示する
         *
         * @return {void}
         **/
        function setFrameList() {
            const list = document.querySelector("#framelist");
            let i = 0;
            FRAMES.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<img src="${item.small}">`; // <li><img ...></li>
                li.classList.add("framelist"); // <li class="framelist" ...
                li.setAttribute("data-index", i++); // <li data-index="1" ...

                // クリックされるとフレーム変更
                li.addEventListener("click", (e) => {
                    const idx = e.target.parentElement.getAttribute("data-index"); // 親(parent)がli
                    drawFrame(FRAMES[idx].large);
                })

                // ulに追加
                list.appendChild(li);
            });
        }

        /**
         * 指定フレームを描画する
         *
         * @param {string} path  フレームの画像URL
         * @return {void}
         */
        function drawFrame(path) {
            const modal = "#dialog-nowloading";
            const image = new Image();
            image.src = path;
            image.onload = () => {
                const ctx = FRAME.getContext("2d");
                ctx.clearRect(0, 0, frame.width, frame.height);
                ctx.drawImage(image, 0, 0, frame.width, frame.height);
                dialogHide(modal);
            };
            dialogShow(modal);
        }

        /**
         * シャッターボタンをクリック
         *
         * @return {void}
         **/
        function onShutter() {
            const ctx = STILL.getContext("2d");
            // 前回の結果を消去
            ctx.clearRect(0, 0, STILL.width, STILL.height);

            // videoを画像として切り取り、canvasに描画
            ctx.drawImage(VIDEO, 0, 0, STILL.width, STILL.height);
        }

        /**
         * ダイアログを表示
         *
         * @param {string} id
         **/
        function dialogShow(id) {
            document.querySelector("#dialog-outer").style.display = "block";
            document.querySelector(id).style.display = "block";
        }

        /**
         * ダイアログを非表示
         *
         * @param {string} id
         **/
        function dialogHide(id) {
            document.querySelector("#dialog-outer").style.display = "none";
            document.querySelector(id).style.display = "none";
        }