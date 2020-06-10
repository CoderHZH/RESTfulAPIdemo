$(function(){
    // 渲染列表数据
    function initlist() {
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function(data) {
                // 渲染书籍列表
                var html = template('indexTpl',{list:data})
                $('#dataList').html(html)
                // 必须在渲染完成后才可以操作DOM标签
                $('#dataList').find('tr').each(function(index,element){
                    var td = $(element).find('td:eq(5)')
                    var id = $(element).find('td:eq(0)').text()
                    // 绑定编辑图书的事件
                    td.find('a:eq(0)').click(function(){
                        editBook(id)
                    })
                    // 绑定删除图书的事件
                    td.find('a:eq(1)').click(function(){
                        delBook(id)
                    })

                    // 绑定添加图书信息的单击事件
                    addBook();
                    // 操作表单后重置表单
                    var form = $('#addBookForm')
                    form.get(0).reset()
                    form.find('input[type=hidden]').val('')
                })
            }
        })
    }
    initlist()

    // 删除图书信息
    function delBook(id) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function(data){
                if(data.flag == 1){
                    // 删除成功 重新渲染
                    initlist()
                }
            }
        })
    }

    // 编辑图书信息
    function editBook(id) {
        var form = $('#addBookForm')
        // 1 根据id查询数据库得到数据
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function(data) {
                // 初始化一个弹窗
                var mark = new MarkBox(600,400,'编辑图书',form.get(0))
                mark.init()
                // 填充表单数据
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);
                // 对表单提交按钮重新绑定单击事件
                form.find('input[type=button]').unbind('click').click(function(){
                    $.ajax({
                        type: 'put',
                        url: '/books/book',
                        data: form.serialize(),
                        dataType: 'json',
                        success: function(data){
                            if(data.flag == 1){
                                // 关闭弹窗
                                mark.close()
                                // 添加成功 重新渲染
                                initlist()
                            }
                        }
                    })
                })
            }
        })
    }

    // 添加图书信息
    function addBook() {
        $('#addBookBtn').click(function(){
            var form = $('#addBookForm')
            var mark = new MarkBox(600,400,'添加图书',form.get(0))
            mark.init()
            form.find('input[type=button]').unbind('click').click(function(){
                $.ajax({
                    type: 'post',
                    url: '/books/book',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function(data){
                        if(data.flag == 1){
                            // 关闭弹窗
                            mark.close()
                            // 添加成功 重新渲染
                            initlist()
                        }
                    }
                })
            })
        })
    }
    
    // 查询天气
    $('#weather').click(function(){
        var cityCode = $('select option:selected').val();
        $.ajax({
            type: 'get',
            url: '/weather/' + cityCode,
            dataType: 'json',
            success: function(data) {
                var html = template('weatherTpl',data.info)
                var mark = new MarkBox(600,400,'天气信息',$(html).get(0))
                mark.init()
            }
        })
    })


})