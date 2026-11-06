import Link from "next/link";

const Navbar = ( )  => {
  
  
  return ( <nav className="bg-gray-800 p-4 navbar navbar-expand-lg navbar-dark" >
    <div className="container">
        <p> Home </p>
    </div>
    <div className="navbar-nav ms-auto">
        <Link href="/dashboard" className="nav-link">
            <p> Dashboard </p>
        </Link>
        <Link href="/about" className="nav-link">
            <p> About </p>
        </Link>
        <Link href="/customer/1" className="nav-link">
            <p> Customer 1 </p>
        </Link>
        <Link href="/customer/2" className="nav-link">
            <p> Customer 2 </p>
        </Link>
    </div>
  </nav>
   );

}

export default Navbar;