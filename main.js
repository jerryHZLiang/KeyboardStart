        // 1. 初始化数据
        var hashA = init()
        var keys = hashA['keys']
        var hash = hashA['hash']

        // 2.生成键盘
        generateKeyboard(keys, hash)

        // 3.监听用户
        listenToUser(hash)

                
        function getFromLocalStorage(name){
           return JSON.parse(localStorage.getItem(name) || 'null')
        }

        function tag(tagName){
            return element = document.createElement(tagName)
        }

        function createSpan(textContent){
            var span = tag('span')
            span.textContent = textContent//row[index2]
            span.className = 'text'
            return span
        }
        
        function createButton(id){
            var button = tag('button')
            button.textContent = 'edit'
            button.id = id
            //change hash
            button.onclick = function(event){
                var button2 = event['target']
                var img2 = button2.previousSibling
                var key = button2.id
                var input = prompt('new website')
                hash[key] = input
                img2.src = 'http://' + input + '/favicon.ico'
                img2.onerror = function(event){
                    event.target.src = '//i.loli.net/2018/08/03/5b641f875b745.png'
                }   
                localStorage.setItem('zzz', JSON.stringify(hash)) // localStorage有很多桶，目前hash存于zzz桶里，做备份的过程
            }
            return button
        }

        function createImg(domain){
            var img = tag('img')
                if(domain){
                    img.src = 'http://'+ domain + '/favicon.ico'
                }else{
                    img.src = '//i.loli.net/2018/08/03/5b641f875b745.png'
                }
                img.onerror = function(event){
                     event.target.src = '//i.loli.net/2018/08/03/5b641f875b745.png'
                }
            return img
        }

        function init(){
            //1.初始化数据
            var keys = {
                0: ['q','w','e','r','t','y','u','i','o','p'],
                1: ['a','s','d','f','g','h','j','k','l'],
                2: ['z','x','c','v','b','n','m'],
                length: 3
            }

            var hash = {
                q: 'qq.com',
                w: 'weibo.com',
                e: 'www.ele.me',
                r: 'renren.com',
                t: 'tianya',
                y: 'youtube.com',
                u: 'uc.com',
                i: 'iqiyi.com',
                o: 'opera.com',
                p: undefined,
                a: 'acfun.cn',
                s: 'sohu.com',
                d: 'douyu.com',
                z: 'zhihu.com',
                m: 'www.mcdonalds.com.cn',
                b: 'bilibili.com'
            } 
            // 取出 localStorage 中的zzz 对应的 hash
            var hashInLocalStorage = getFromLocalStorage('zzz') 
                if(hashInLocalStorage){
                    hash = hashInLocalStorage
                }

            return {
                "keys": keys
                ,"hash": hash
            }
        }

        function generateKeyboard(keys, hash){
            
            //遍历keys, 生成kbd标签
            for(var index = 0;index < keys.length;index++){
                var div = tag('div')
                div.className = 'row'

                main.appendChild(div)
            
                var row = keys[index]
                for(var index2 = 0; index2 < row.length; index2++){
                    var span = createSpan(row[index2])

                    var button = createButton(row[index2])

                    var img = createImg(hash[row[index2]])

                    var kbd = tag('kbd')
                    kbd.className = 'key'

                    kbd.appendChild(span)
                    kbd.appendChild(img)
                    kbd.appendChild(button)

                    div.appendChild(kbd)
                }
            }
        }

        function listenToUser(hash){
            document.onkeypress = function(event){
            var key = event['key']
            var website = hash[key]
            //location.href = 'http://'+ website
            window.open('http://'+ website, '_blank')
        }
        }