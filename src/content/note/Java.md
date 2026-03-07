---
title: 'Java'
description: 'Java基础入门笔记'
pubDate: 'Jan 14 2024'
---

##### 入门

属性（property）=成员变量=域/字段（field）对象（Object）=实例（instance），创建类的对象=类的实例化。

类中的属性可以通过Object.field来调用。new就是创建对象，要在方法中传递其他方法参数只能通过对象。创建对象之后才能用对象通过Object.Method()来调用方法：
A Object = new A();
Object.Method();
Class A{
Method(){}
}
（重要）对象赋值是直接赋地址，在函数的形参中也需要用对象来传递参数，这样传入的是对象的地址
所以 A Object2=Object1; 之后，修改Object2中的任何参数都会直接改变Object1中的对应参数。
构造器（Constructor）要和类名相同，不需要返回参数，执行该类中的方法时会在构造器中进行初始化，也可以重载。
方法的重载要在同一个类，要求重载的方法同名，参数个数或者形式不同。
this是调用当前方法的那个对象，this.xxx是那个对象的属性。构造器中的this只能放在第一行，表示调用了其他构造器。
继承性的格式：class A extends
A:子类、派生类、subclass
B:父类、超类、基类、superclass
子类A继承父类B以后，子类A中就获取了父类B中声明的所有的非私有属性和方法。构造器不会被继承，但是创建对象的时候会被调用。可以使用super来访问父类，比如super.var访问父类中的var元素

##### 多态

向下转型：Person man = new Man();
向上转型：向下转型后：Man coder = (Man)man;
只有方法重写，属性不会重写。man.name会调用Person中的属性，man.getname()会调用Man中的方法。
动态绑定机制：调用方法时，该方法会和运行类型绑定，属性则不会。例如父类中sum()方法中的geti()+getj()会调用子类中的方法，如果是i+j则调用父类中的属性。如果在子类中无法找到对应方法则使用父类中的该方法。

##### equals方法的重写

既可以比较基本类型也可以比较引用类型。对于基本类型就是比较值，对于引用类型就是比较内存地址
equals是属于java.lang.Object类里面的方法，如果该方法没有被重写过默认也是；String等类的equals方法是被重写过的。
具体要看自定义类里有没有重写Object的equals方法来判断。
通常情况下，重写equals方法，会比较类中的相应属性是否都相等。

##### finalize和System.gc()

jvm销毁没有任何引用的对象时会调用finalize方法，由系统的gc算法来自动进行回收，可以通过System.gc()主动触发

##### next()与nextLine()

next()读取到有效字符后才可以结束输入，对输入有效字符之前遇到的空格键、Tab键或Enter键等结束符，next()方法会自动将其去掉，只有在输入有效字符之后，next()方法才将其后输入的空格键、Tab键或Enter键等视为分隔符或结束符。 nextLine()方法的结束符只是Enter键，即nextLine()方法返回的是Enter键之前的所有字符，它是可以得到带空格的字符串的.

##### final

final类不能被继承
final方法不能被重写
final变量是一个常量
static final 全局常量
final 和static 往往搭配使用，效率更高，不会导致类加载，底层编译器做了优化处理。


如果final修饰的属性是静态的，则初始化的位置只能是定义时或在静态代码块，不能在构造器中赋值。

##### 创建一个子类时（继承关系）调用顺序如下：

①父类的静态代码块和静态属性
②子类的静态代码块和静态属性
③父类的普通代码块和普通属性初始化
④父类的构造方法
⑤子类的普通代码块和普通属性初始化
⑥子类的构造方法

##### 静态

静态代码块只能调用静态成员
静态方法中只能使用静态方法和属性
静态方法中不能使用this和super
静态方法在类加载时加载，并且只加载一次

##### 类什么时候被加载

①创建对象实例时（new)
②创建子类对象实例，父类也会被加载
③使用类的静态成员时（静态属性，静态方法)案例演示：A类extends B类 的静态块

##### 代码块

使用{}括起来的代码被称为代码块
局部代码块
位置：方法中定义
作用：限定变量的生命周期，及早释放，提高内存利用率
构造代码块
位置：类中方法外定义
特点：每次构造方法执行的时候，都会执行该代码块中的代码，并且在构造方法执行前执行
作用：将多个构造方法中相同的代码，抽取到构造代码块中，提高代码的复用性
静态代码块
位置：类中方法外定义
特点：需要通过static关键字修饰，随着类的加载而加载，并且只执行一次
作用：在类加载的时候做一些数据初始化的操作

##### 抽象类

1. 抽象类不能被实例化
2. 抽象类不一定要包含抽象方法
3. 抽象方法的类必须声明为抽象类
4. abstract 只能修饰类和方法，不能修饰属性和其它的。
5. 抽象方法不能有主体，即不能实现.
6. 一个类继承抽象类，则必须实现该抽象类的所有抽象方法，除非它自己也声明抽象类。

##### 接口

1. 接口不能被实例化
2. 接口中的属性默认是 public static final。
3. 接口中所有的方法默认是public abstract方法。
4. 一个类实现接口，则必须实现该接口的所有方法，除非它自己也声明抽象类。
5. 一个类同时可以实现多个接口，一个接口不能继承其它的类，但是可以继承多个别的接口

##### 枚举

进行自定义类实现枚举，有如下特点：

1. 构造器私有化，防止直接 new
2. 本类内部创建一组固定的对象
3. 优化，对外暴露对象（通过为对象添加 public final static 修饰符)
4. 可以提供 getter，但是不要提供 setter，防止属性被修改

使用：

```java
enum Season {
    SPRING("春天", "温暖"), SUMMER("夏天", "炎热"), AUTUMN("秋天", "凉爽"), WINTER("冬天", "寒冷");
    String name, desc;


    Season() {
        this(null, null);
    }

    Season(String name, String desc) {

        this.name = name;

        this.desc = desc;

    }

}

public class Enumeration {
    public static void main(String[] args) {
        Season summer = Season.SUMMER;
        System.out.println(summer);
    }
}
```



1.当我们使用enum关键字开发一个枚举类时，默认会继承Enum类，而且是一个final 类

2.传统的public static final Season2 SPRING= new Season2("春天"，“温暖“)；简化成 SPRING("春天"，“温暖“)，这里必须知道，它调用的是哪个构造器.

3.如果使用无参构造器创建枚举对象，则实参列表和小括号都可以省略

4.当有多个枚举对象时，使用逗号间隔，最后有一个分号结尾

5.枚举对象必须放在枚举类的第一行



枚举方法：

1. toString()和name()：返回当前对象名

2. ordinal()：当前对象的位置号
3. values()：返回当前枚举类中的所有常量
4. valueOf()：将字符串转换为枚举对象，要求字符串必须为已有常量名
5. compareTo()：比较两个枚举常量的位置号
6. getDeclaringClass()：得到枚举所属枚举类型的Class对象，可以用来判断两个枚举常量是否属于同一个常量



##### 增强型for循环

Java中的高级for循环是集合中（Collection）迭代器的简写形式。它的格式为：`for (数据类型 变量名：被遍历的集合（Collection）或数组) { }`。高级for循环只对集合进行遍历，只能获取集合元素，但是不能对集合进行操作。



##### 内部类

获取内部类的两种方式：

1. 外部类编写方法，对外部提供内部类对象
2. 直接创建：`Outer.Inner oi = new Outer().new Inner();`

​	静态内部类创建：`Outer.Inner oi = new Outer.Inner();`

##### System方法

| 方法                                                         | 作用                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| `public static void exit(int status)`                        | 终止当前运行的Java 虚拟机            |
| `public static long currentTimeMillis()`                     | 返回当前系统的时间毫秒值形式         |
| `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)` | 数组拷贝，一般使用Arrays.copy和Clone |
| `public static void gc()`                                    | 回收                                 |

##### 注意事项

【2023新版Java视频教程，一套超哇塞的Java教程，java零基础自学入门必看黑马java教程-哔哩哔哩】【视频标记点 11:09】 https://b23.tv/PteyuHm

调用equals方法时，如果是变量与常量作比较，使用常量来调用方法，可以避免变量造成的空指针异常

在遍历集合的过程中，如果有删除操作：

1.正序遍历：需要 `i--`操作

2.倒序遍历：不需要 `i--`操作



idea中代码包围方式快捷键 Ctrl+Alt+T

try-catch-finally执行顺序小结
1）如果没有出现异常，则执行try块中所有语句，不执行catch块中语句，如果有finally，最后还需要执行finally里面的语句
2）如果出现异常，则try块中异常发生后，剩下的语句不再执行。将执行catch块中的语句，如果有finally，最后还需要执行finally里面的语句！

获取异常信息：

```java
try{
}catch(Exception e){
	e.getMessage()
}
```



异常分为两大类，运行时异常和编译时异常.

编译异常是指在编译期间，就必须处理的异常，否则代码不能通过编译。
常见的编译异常

| 方法                        | 作用                               |
| --------------------------- | ---------------------------------- |
| `SQLException`              | 操作数据库时，查询表可能发生异常   |
| `IOException`               | 操作文件时，发生的异常             |
| `FileNotFoundException`     | 当操作一个不存在的文件时，发生异常 |
| `ClassNotFoundException`    | 加载类，而该类不存在时，异常       |
| `EOFException`              | 操作文件，到文件末尾，发生异常     |
| `IllegalArguementException` | 参数异常                           |

运行时异常，编译器不要求强制处置的异常。一般是指编程时的逻辑错误，是程序员应该避免其出现的异常。`java.lang.RuntimeException`类及它的子类都是运行时异常
对于运行时异常，可以不作处理，因为这类异常很普遍，若全处理可能会对程
序的可读性和运行效率产生影响

常见的运行时异常包括

| 方法                             | 作用               |
| -------------------------------- | ------------------ |
| `NullPointerException`           | 空指针异常         |
| `ArithmeticException`            | 数学运算异常       |
| `ArraylndexOutOfBoundsException` | 数组下标越界异常   |
| `ClassCastException`             | 类型转换异常       |
| `NumberFormatException`          | 数字格式不正确异常 |



##### parseInt 和 valueOf

parseInt方法是Java语言中的一个方法，用于将字符串参数转换为整数值。

如果方法有两个参数，使用第二个参数指定的基数，将字符串参数解析为有符号的整数。

例如，`int x = Integer.parseInt("11", 2);` 这句代码将把字符串"11"当作二进制数，然后转换为十进制数3。
parseInt方法和valueOf方法的区别是：

\- parseInt方法返回的是**int**类型，而valueOf方法返回的是**Integer**类型。
\- valueOf方法可以返回一个**缓存的Integer实例**，而parseInt方法每次都会创建一个新的int值。
\- valueOf方法可以接受一个**char数组**作为参数，而parseInt方法只能接受一个**字符串**作为参数。
如果parseInt方法传入的是一个**小数**，它会**忽略小数点后面的部分**，只返回小数点前面的整数。

例如，parseInt("3.14")会返回3，而不是3.14。

但是，如果小数点后面的位数超过了6位，parseInt方法可能会出现**精度问题**，导致返回的整数不正确。

例如，parseInt("0.0000001")会返回1，而不是0。



##### 包装类和和String的相互转换（Integer为例）

```java
Integer i = 10;

//Integer转String

String s1 = i.toString();

String s2 = Integer.toString(i);

String s3 = String.valueOf(i);

String s4 = i+"";	//Not recommanded

//String转Integer

Integer i1 = Integer.parseInt(s1);

Integer i2 = Integer.valueOf(s2);

@Deprecated
Integer i3 = Integer.valueOf(s3);
```



##### 字符串类

在Java中，String，StringBuffer和StringBuilder都是用来封装字符串的类

字符串属于对象，Java提供了String类来创建和操作字符串。String类是不可变类，即一旦一个String对象被创建以后，包含在这个对象中的字符序列是不可改变的，直至这个对象被销毁。

当对字符串进行修改的时候，需要使用StringBuffer和StringBuilder类。和String类不同的是，这两个类的对象能够被多次的修改，并且不产生新的未使用对象。在使用StringBuffer类时，每次都会对对象本身进行操作，而不是生成新的对象，所以如果需要对字符串进行修改推荐使用StringBuffer。

StringBuffer和StringBuilder之间的最大不同在于，StringBuffer是线程安全的，StringBuilder相较于有速度优势，所以多数情况下建议使用StringBuilder类。

StringBuffer常用方法
`append(String str)`：字符串拼接。
`delete(int start,int end)`：删除指定位置的内容。
`replace(int start, int end, String str)`：把[start,end)位置替换为str。
`insert(int offset, String str)`：在指定位置插入str。



##### Collection

List、Set、Map 之间的区别如下:

List: 有序可重复，可以插入多个 null 对象

Set: 无序不重复，只允许一个 null 对象

Map: 不是 Collection 的子接口或者实现类，Map 是一个接口。Map 的每个 Entry 都持有两个对象，也就是一个键一个值。Map 可能会持有相同的值对象但键对象必须是唯一的。Map 中存储的数据是无序的，它的键不允许重复，但值允许重复



HashSet 是 Java 集合框架中的一种数据结构，它基于 HashMap 来实现，是一个不允许有重复元素的集合。它允许有 null 值，是无序的，即不会记录插入的顺序。HashSet 不是线程安全的

LinkedHashSet 是 HashSet 的子类，它继承了 HashSet 的快速查找特性，同时保留了元素插入的顺序。这是因为它在 HashSet 的哈希表数据结构基础之上，增加了一个双向链表用来记录元素添加的顺序。这样，它能按照添加顺序遍历输出

Hashtable 是线程安全的，而 HashMap 性能更高。在多线程环境下若使用 HashMap 需要使用 Collections.synchronizedMap() 方法来获取一个线程安全的集合

HashMap 允许将 null 作为一个 entry 的 key 或者 value，而 Hashtable 不允许。这并不是因为 `Hashtable` 有什么特殊的实现层面的原因导致不能支持 null 键和 null 值，这仅仅是因为 HashMap 在实现时对 null 做了特殊处理，将 null 的 hashCode 值定为了 0，从而将其存放在哈希表的第 0 个 bucket 中



线程安全总结：

| 不安全          | 安全           |
| --------------- | -------------- |
| `ArrayList`     | `Vector`       |
| `StringBuilder` | `StringBuffer` |
| `HashMap`       | `Hashtable`    |



##### CDN

CDN（内容分发网络）是高效地向用户分发Web内容的分布式服务器网络。CDN将缓存的内容存储在位于靠近最终用户的入网点（POP）位置的边缘服务器，以最大程度地降低延迟。这样，当用户打开网页，就可以从距离自己最近的服务器下载获得图片，从而提高图片的加载速度。请求重定向和请求转发是Web开发中常用的两种技术。它们的主要区别在于，请求转发是服务器端直接将请求转发到另一个资源，而请求重定向是服务器端发送一个重定向响应，告诉浏览器需要重新发送请求到另一个资源。



##### 重定向与请求转发

重定向是两次请求，每次都是从客户端发起；而转发是一次请求，是服务器发起的转发。重定向后，url路径会改变；转发不会改变url路径，还是原先的访问路径。在应用中往往增删改使用重定向。比如我们在使用完增删改后，如果路径不改变，则继续刷新，会出现增删改异常；而查询需要使用转发，转发后，可实时变更使用request传值。

请求转发通常用于在服务器内部进行资源跳转，例如从一个Servlet跳转到另一个Servlet或JSP页面。它可以在不同的资源之间共享请求和响应对象，因此可以在不同的资源之间共享数据。请求转发也可以用于隐藏实际的资源路径，因为客户端浏览器的URL地址栏不会改变。

请求重定向通常用于在客户端浏览器和服务器之间进行资源跳转。例如，当用户在表单中提交数据后，服务器端可能会对数据进行处理并将结果存储在数据库中，然后通过重定向将用户重定向到一个新的页面，显示处理结果或提示信息。请求重定向也可以用于防止表单重复提交，因为重定向会导致浏览器发起新的GET请求，而不是再次提交表单。



##### executeQuery

Statement中的executeQuery方法用于执行SQL查询语句并返回结果集。在使用executeQuery方法时，需要注意以下几点：

1. SQL语句必须是查询语句，不能是增删改操作。
2. 如果SQL语句包含参数化的参数，则必须通过set方法设置参数值，否则会抛出异常。
3. 如果查询结果为空，则executeQuery方法返回的结果集对象不包含任何数据。

为了避免这些问题，可以使用PreparedStatement来替代Statement。PreparedStatement是预编译的SQL语句对象，它可以提高代码的可读性和可维护性，提高SQL语句的性能，并且能有效地防止SQL注入攻击。使用PreparedStatement时，可以通过set方法设置参数值，避免SQL语句拼接操作。此外，PreparedStatement还提供了executeUpdate方法用于执行增删改操作。



##### JDBC

JDBC（Java Database Connectivity）是Java语言的应用程序接口，它定义了客户端如何访问数据库。它是一种基于Java的数据访问技术，用于Java数据库连接。只要提供适当的驱动程序，JDBC就可以与任何数据库一起使用。JDBC驱动程序有四种类型：JDBC-ODBC桥接驱动程序、本机驱动程序、网络协议驱动程序和薄驱动程序。

JDBC提供了两种连接数据库的技术：JDBC-ODBC桥接器方式和加载纯java数据库驱动程序。

JDBC-ODBC桥接器方式是一种旧的连接技术，它适用于JDK1.8之前的版本。它通过JDBC-ODBC桥接器将JDBC调用转换为ODBC调用，然后再通过ODBC驱动程序连接到数据库。这种方式的缺点是需要在客户端计算机上安装ODBC驱动程序，并且性能较差。

加载纯java数据库驱动程序是一种更常用的连接技术。它直接使用纯Java编写的数据库驱动程序来连接到数据库，无需安装任何其他软件。这种方式的优点是性能较好，且跨平台。

建议使用加载纯java数据库驱动程序来连接数据库，因为它具有更好的性能和跨平台能力。

要使用JDBC连接数据库，需要按照以下步骤进行操作：
1. 导入JDBC包：使用Java语言的import语句在Java代码开头位置导入所需的类。
2. 注册JDBC驱动程序：使JVM将所需的驱动程序实现加载到内存中，从而可以满足JDBC请求。
3. 数据库URL配置：创建一个正确格式化的地址，指向要连接到的数据库 (如：MySQL,Oracle和MSSQL等等)。
4. 创建连接对象：最后，调用DriverManager对象的getConnection()方法来建立实际的数据库连接。

例如，下面是一个简单的示例，演示如何使用JDBC连接MySQL数据库：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JdbcExample {
    public static void main(String[] args) {
        // JDBC驱动名称和数据库URL
        final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
        final String DB_URL = "jdbc:mysql://localhost:3306/database_name";

        // 数据库用户名和密码
        final String USER = "username";
        final String PASS = "password";

        Connection conn = null;

        try {
            // 注册JDBC驱动程序
            Class.forName(JDBC_DRIVER);

            // 打开连接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // 这里可以执行SQL语句

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            // 关闭连接
            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```



##### 数据库连接池

要使用数据库连接池，您需要在您的应用程序中引入一个数据库连接池库。有许多开源的数据库连接池库可供选择，如C3P0、DBCP、Druid等。您可以根据您的需求选择一个合适的库。

使用数据库连接池时，您需要创建一个DataSource对象，并配置连接池的相关参数，如最大连接数、最小连接数、超时时间等。然后，您可以通过DataSource对象获取数据库连接。当您使用完数据库连接后，应该调用Connection对象的close方法将连接释放回连接池，以便其他线程可以重复使用该连接。

数据库连接池的配置是开发者们常常搞出坑的地方，在配置数据库连接池时，有几个可以说是和直觉背道而驰的原则需要明确。这里有一些常用的数据库连接池参数：
1. 初始连接数（initialSize）：连接池初始建立的连接数。
2. 最小连接数（minIdle）：连接池中保持的最小连接数。
3. 最大连接数（maxActive）：连接池中最大允许的连接数。
4. 最大等待时间（maxWait）：获取连接的最大等待时间，超时将抛出异常。
5. 连接池是否预处理语句（poolPreparedStatements）：是否开启预处理语句，可以提高数据库访问效率。
6. 预处理语句缓存大小（maxOpenPreparedStatements）：缓存预处理语句的数量。
7. 连接是否自动提交事务（defaultAutoCommit）：连接是否自动提交事务，可以避免出现事务管理错误。
8. 连接的有效性检查（testOnBorrow）：从连接池中获取连接时，是否对连接的有效性进行检查。



##### Java反射

Java反射是一种在运行时检查或修改类的运行时属性的过程。它允许执行中的Java程序检查或“自省”自身，并操纵程序的内部属性。例如，Java类可以获取其所有成员的名称并显示它们。这种能力在其他编程语言中可能并不存在。例如，在Pascal、C或C++程序中，没有办法获取程序中定义的函数的信息。

Java反射有许多应用场景，例如：
1. 框架的编写：反射机制在框架的编写中非常常见，例如动态代理中、类扫描解析中。
2. JDBC的数据库连接：在JDBC的操作中，如果要想进行数据库的连接，则必须通过Class.forName()加载数据库的驱动程序（通过反射加载，前提是引入相关了Jar包）。
3. Spring框架的使用：Java的反射机制在做基础框架的时候非常有用，行内有一句这样的老话：反射机制是Java框架的基石。一般应用层面很少用，不过这种东西，现在很多开源框架基本都已经封装好了，自己基本用不着写。典型的除了hibernate之外，还有spring也用到很多反射机制。最经典的就是xml的配置模式。

要使用Java反射，需要按照以下步骤进行操作：
1. 获取Class对象：可以通过Class.forName()方法，或者通过对象的getClass()方法，或者通过类名.class的方式来获取Class对象。
2. 获取类的构造函数：可以通过Class对象的getConstructor()方法或getDeclaredConstructor()方法来获取类的构造函数。
3. 创建对象实例：可以通过构造函数对象的newInstance()方法来创建类的实例。
4. 获取类的成员变量：可以通过Class对象的getField()方法或getDeclaredField()方法来获取类的成员变量。
5. 获取类的成员方法：可以通过Class对象的getMethod()方法或getDeclaredMethod()方法来获取类的成员方法。
6. 访问成员变量和调用成员方法：可以通过Field对象的set()和get()方法来访问成员变量，可以通过Method对象的invoke()方法来调用成员方法。

例如，下面是一个简单的示例，演示如何使用Java反射：
```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        // 获取Class对象
        Class<?> clazz = Class.forName("java.lang.String");

        // 获取构造函数并创建实例
        Object obj = clazz.getConstructor(String.class).newInstance("Hello, world!");

        // 获取并访问成员变量
        Field field = clazz.getDeclaredField("value");
        field.setAccessible(true);
        char[] value = (char[]) field.get(obj);
        System.out.println(value);

        // 获取并调用成员方法
        Method method = clazz.getMethod("substring", int.class);
        String result = (String) method.invoke(obj, 7);
        System.out.println(result);
    }
}
```



##### @Test注解

Java中的@Test用于标记要执行的测试方法。它是JUnit测试框架的一部分，可以帮助你验证你的代码是否正确运行。使用@Test注解的方法必须满足以下要求：
\- 方法必须是public void，即没有返回值，也没有参数。
\- 方法必须在一个测试类中，测试类通常以Test结尾，例如CalculatorTest。
\- 方法可以使用Assert类的方法来检查预期的结果和实际的结果是否一致，例如Assert.assertEquals(4, result)。
\- 方法可以使用expected属性来指定期望抛出的异常类型，例如@Test(expected = ArithmeticException.class)。
\- 方法可以使用timeout属性来指定执行时间的上限，例如@Test(timeout = 1000)。

使用@Test注解的方法可以通过IDE或者命令行来运行，运行后会显示测试结果，包括成功、失败、错误等信息。你可以通过查看测试结果来发现和修复你的代码中的问题。



##### 流的分类

按操作数据单位不同分为：字节流(8 bit)二进制文件，字符流（按字符）文本文件
按数据流的流向不同分为：输入流，输出流
按流的角色的不同分为：节点流，处理流/包装流
字节流InputStream OutputStream
字符流Reader Writer

1) Java的IO流共涉及40多个类，实际上非常规则，都是从如上4个抽象基类派生的。

2）由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。



##### 泛型

###### 泛型方法

1.非静态方法：内部的泛型，会根据类的泛型去匹配

```java
public void method<E> ()
```



2.静态的方法：调用方法，传入实际参数的时候，确定到具体的类型

```java
public static <T> void method(T[] arr){}
```



注：泛型只能编写引用数据类型的数组
