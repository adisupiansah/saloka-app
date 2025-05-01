"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUserNurse } from "react-icons/fa";
import { useHooksLogout } from "@/libs/logut";
import { FaUser } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "@/app/img/logoLogistik.png";
import Link from "next/link";
import 'animate.css'
import { auth } from "@/libs/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navigasibar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenDisposisi, setIsDropdownOpenDisposisi] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    return () => unsubscribe();
  }, [])

  // state untuk buka dropdown user
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);

  const pathname = usePathname();

  // Logout
  const {handleLogout} = useHooksLogout()

  useEffect(() => {
    if (pathname === "/") {
      setActiveMenu("Dashboard");
      setActiveSubMenu(null);
    } else if (pathname.startsWith("/notadinas")) {
      setActiveMenu("Nota Dinas");

      if (pathname === "/notadinas") {
        setActiveSubMenu("Nota keluar");
      } else if (pathname === "/notadinas/input") {
        setActiveSubMenu("Input");
      } else if (pathname === "/notadinas/pengajuan") {
        setActiveSubMenu("Pengajuan");
      } else if (pathname === "/notadinas/arsip") {
        setActiveSubMenu("Arsip");
      }
    } else if (pathname.startsWith("/disposisi")) {
      setActiveMenu("Disposisi");

      if (pathname === "/disposisi") {
        setActiveSubMenu("Disposisi masuk");
      } else if (pathname === "/disposisi/input") {
        setActiveSubMenu("Input disposisi");
      }
    }
  }, [pathname]);

  if(pathname === '/auth' || pathname === '/not-found') return null

  const toggleDropdown = (e) => {
    // 1. Stop event bubbling ke parent
    e.stopPropagation();
    
    // 2. Toggle state seperti biasa
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenDisposisi(false);
  
    // 3. Pasang event listener langsung ke document
    if (!isDropdownOpen) {
      document.addEventListener('click', () => setIsDropdownOpen(false), { once: true });
    }
  };

  const toggleDropdownDisposisi = (e) => {
    e.stopPropagation();

    setIsDropdownOpenDisposisi(!isDropdownOpenDisposisi);
    setIsDropdownOpen(false);

    if (!isDropdownOpenDisposisi) {
      document.addEventListener('click', () => setIsDropdownOpenDisposisi(false), { once: true });
    }
  };

  const toggleDropdownUser = (e) => {
    e.stopPropagation();

    setIsDropdownOpenUser(!isDropdownOpenUser);
    setIsDropdownOpen(false);

    if (!isDropdownOpenUser) {
      document.addEventListener('click', () => setIsDropdownOpenUser(false), { once: true });
    }

  };

  const handleSubMenuClick = () => {
    setIsDropdownOpen(false);
    setIsDropdownOpenDisposisi(false);
  };

  const menuActiveClass = (menu) => (activeMenu === menu ? "active" : "");
  const submenuActiveClass = (submenu) => (activeSubMenu === submenu ? "active" : "");
  

  return (
    <div className="fixed-top">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand d-flex justify-content-center align-items-center" href="/">
            <Image src={logo} alt="logo" width={56} height={65} />
            <div className="d-flex flex-column mx-2">
              <span>BAGIAN LOGISTIK</span>
              <span>POLRES KARIMUN</span>
            </div>
          </a>

          <div className="d-flex justify-content-end">
            <button className="btn-user d-flex justify-content-center align-items-center" onClick={(e) => toggleDropdownUser(e)}>
              <FaUserNurse className="icon"/>
            </button>
            {isDropdownOpenUser && (
              <div className="shadow-sm open-user animate__animated animate__zoomIn ">
                <div className="d-flex justify-content-center align-items-center user-profile">
                    <FaUser className="icon-user"/>
                    <h1 className="mx-2">{user ? user.email : 'Guest'}</h1>
                </div>

                <div className="garis-pembatas"></div>

                {/* <div className="user-settings col-md-12 d-flex justify-content-center align-items-center">
                    <Link className="btn-settings col-md-12 text-center" href='/admin/account/settings'>settings</Link> 
                </div> */}
                <div className="user-logout">
                    <button className="btn-logout col-md-12" onClick={handleLogout}>Logout</button> 
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>
      <nav className="navbar-nav shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Link href="/" className={`pointer ${menuActiveClass("Dashboard")}`}>
              Dashboard
            </Link>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Nota Dinas")}`}
                onClick={(e) => toggleDropdown(e)}
              >
                {activeMenu === "Nota Dinas" ? activeSubMenu : "Nota Dinas"}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show mt-3 animate__animated animate__zoomIn">
                  <Link
                    href="/notadinas"
                    className={`dropdown-item ${submenuActiveClass("Nota keluar")}`}
                    onClick={handleSubMenuClick}
                  >
                    Nota keluar
                  </Link>
                  <Link
                    href="/notadinas/input"
                    className={`dropdown-item ${submenuActiveClass("Input")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input
                  </Link>
                  <Link
                    href="/notadinas/pengajuan"
                    className={`dropdown-item ${submenuActiveClass("Pengajuan")}`}
                    onClick={handleSubMenuClick}
                  >
                    Pengajuan
                  </Link>
                  <Link
                    href="/notadinas/arsip"
                    className={`dropdown-item ${submenuActiveClass("Arsip")}`}
                    onClick={handleSubMenuClick}
                  >
                    Arsip
                  </Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Disposisi")}`}
                onClick={(e) => toggleDropdownDisposisi(e)}
              >
                {activeMenu === "Disposisi" ? activeSubMenu : "Disposisi"}
              </div>
              {isDropdownOpenDisposisi && (
                <div className="dropdown-menu show mt-3 animate__animated animate__zoomIn">
                  <Link
                    href="/disposisi"
                    className={`dropdown-item ${submenuActiveClass("Disposisi masuk")}`}
                    onClick={handleSubMenuClick}
                  >
                    Disposisi masuk
                  </Link>
                  <Link
                    href="/disposisi/input"
                    className={`dropdown-item ${submenuActiveClass("Input disposisi")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input disposisi
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigasibar;
