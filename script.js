// CodeMirror 초기화
let editor;
let latexSource = "";

// 로그 패널 토글 함수
function toggleLogs() {
  const logPanel = document.getElementById("log-panel");
  logPanel.style.display = logPanel.style.display === "none" ? "block" : "none";
}

// 로그 메시지 추가 함수
function addLog(message, type = "info") {
  const logPanel = document.getElementById("log-panel");
  const logEntry = document.createElement("div");
  logEntry.textContent = message;
  logEntry.className = type;
  logPanel.appendChild(logEntry);
  logPanel.scrollTop = logPanel.scrollHeight;

  // 로그 패널이 숨겨져 있으면 표시
  if (logPanel.style.display === "none" || !logPanel.style.display) {
    logPanel.style.display = "block";
  }

  // 5초 후 자동으로 숨기기
  setTimeout(() => {
    if (logPanel.children.length <= 1) {
      logPanel.style.display = "none";
    }
    if (logPanel.contains(logEntry)) {
      logPanel.removeChild(logEntry);
    }
  }, 5000);
}

// 참고 자료 형식
const references = [
  {
    id: "3dconnexion2021",
    author: "3dconnexion",
    title: "Space Mouse 3D input Device",
    year: "2021",
    url: "http://www.3dconnexion.fr/nc/company/press-room/",
  },
  {
    id: "adhanom2023",
    author: "Isayas Berhe Adhanom, Paul MacNeilage, and Eelke Folmer",
    title: "Eye tracking in virtual reality: a broad review of applications and challenges",
    year: "2023",
    journal: "Virtual Reality",
    volume: "27",
    number: "2",
    pages: "1481–1505",
  },
  {
    id: "asahina2021",
    author: "Ray Asahina, Takashi Nomoto, Takatoshi Yoshida, and Yoshihiro Watanabe",
    title: "Realistic 3D swept-volume display with hidden-surface removal using physical materials",
    year: "2021",
    journal: "IEEE Virtual Reality and 3D User Interfaces (VR)",
    pages: "113–121",
  },
  {
    id: "balakrishnan2001",
    author: "Ravin Balakrishnan, George W Fitzmaurice, and Gordon Kurtenbach",
    title: "User interfaces for volumetric displays",
    year: "2001",
    journal: "Computer",
    volume: "34",
    number: "3",
    pages: "37–45",
  },
  {
    id: "barnum2010",
    author: "Peter C. Barnum, Srinivasa G. Narasimhan, and Takeo Kanade",
    title: "A multi-layered display with water drops",
    year: "2010",
    journal: "ACM SIGGRAPH 2010 papers",
    pages: "1–7",
    doi: "10.1145/1833349.1778813",
  },
  {
    id: "bryson2005",
    author: "Steve Bryson",
    title: "Direct Manipulation in Virtual Reality",
    year: "2005",
    booktitle: "Visualization Handbook",
    publisher: "Elsevier",
    pages: "413–430",
    doi: "10.1016/B978-012387582-2/50023-X",
  },
  {
    id: "carter2013",
    author: "Tom Carter, Sue Ann Seah, Benjamin Long, Bruce Drinkwater, and Sriram Subramanian",
    title: "UltraHaptics: multi-point mid-air haptic feedback for touch surfaces",
    year: "2013",
    booktitle: "Proceedings of the 26th annual ACM symposium on User interface software and technology",
    pages: "505–514",
  },
  {
    id: "cassinelli2005",
    author: "Alvaro Cassinelli and Masatoshi Ishikawa",
    title: "Khronos projector",
    year: "2005",
    booktitle: "ACM SIGGRAPH 2005 Emerging technologies",
    pages: "10",
    doi: "10.1145/1187297.1187308",
  },
  {
    id: "dand2013",
    author: "Dhairya Dand and Robert Hemsley",
    title: "Obake: interactions on a 2.5 D elastic display",
    year: "2013",
    booktitle: "Adjunct Proceedings of the 26th Annual ACM Symposium on User Interface Software and Technology",
    pages: "109–110",
  },
  {
    id: "dang2007",
    author: "Nguyen-Thong Dang",
    title: "A survey and classification of 3D pointing techniques",
    year: "2007",
    booktitle: "IEEE international conference on research, innovation and vision for the future",
    pages: "71–80",
  },
  {
    id: "eitoku2006",
    author: "S. Eitoku, T. Tanikawa, and Y. Suzuki",
    title: "Display Composed of Water Drops for Filling Space with Materialized Virtual Three-dimensional Objects",
    year: "2006",
    booktitle: "IEEE Virtual Reality Conference (VR 2006)",
    pages: "159–166",
    doi: "10.1109/VR.2006.51",
  },
  {
    id: "feix2016",
    author: "Thomas Feix, Javier Romero, Heinz-Bodo Schmiedmayer, Aaron M. Dollar, and Danica Kragic",
    title: "The GRASP Taxonomy of Human Grasp Types",
    year: "2016",
    journal: "IEEE Transactions on Human-Machine Systems",
    volume: "46",
    number: "1",
    pages: "66–77",
    doi: "10.1109/THMS.2015.2470657",
  },
  {
    id: "fernandez2024",
    author: "Unai Javier Fernández, Iosune Sarasate, Iñigo Ezcurdia, Manuel Lopez-Amo, Ivan Fernández, and Asier Marzo",
    title: "PointerVol: A Laser Pointer for Swept Volumetric Displays",
    year: "2024",
    booktitle: "Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology (UIST ’24)",
    pages: "1–8",
    doi: "10.1145/3654777.3676432",
  },
  {
    id: "forlines2007",
    author: "Clifton Forlines, Daniel Wigdor, Chia Shen, and Ravin Balakrishnan",
    title: "Direct-touch vs. mouse input for tabletop displays",
    year: "2007",
    booktitle: "Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI ’07)",
    pages: "647–656",
    doi: "10.1145/1240624.1240726",
  },
  {
    id: "fushimi2019",
    author: "Tatsuki Fushimi, Asier Marzo, Bruce W Drinkwater, and Thomas L Hill",
    title: "Acoustophoretic volumetric displays using a fast-moving levitated particle",
    year: "2019",
    journal: "Applied Physics Letters",
    volume: "115",
    number: "6",
  },
  {
    id: "goldstein2002",
    author: "E Bruce Goldstein and James R Brockmole",
    title: "Sensation and perception",
    year: "2002",
    volume: "90",
    publisher: "Wadsworth-Thomson Learning Pacifc Grove, CA, USA",
  },
  {
    id: "grossman2006",
    author: "Tovi Grossman and Ravin Balakrishnan",
    title: "The design and evaluation of selection techniques for 3D volumetric displays",
    year: "2006",
    booktitle: "Proceedings of the 19th annual ACM symposium on User interface software and technology",
    pages: "3–12",
  },
  {
    id: "grossman2004",
    author: "Tovi Grossman, Daniel Wigdor, and Ravin Balakrishnan",
    title: "Multi-finger gestural interaction with 3d volumetric displays",
    year: "2004",
    booktitle: "Proceedings of the 17th annual ACM symposium on User interface software and technology",
    pages: "61–70",
  },
  {
    id: "hahn2023",
    author: "Joonku Hahn, Woonchan Moon, Hosung Jeon, Minwoo Jung, Seongju Lee, Gunhee Lee, and Muhan Choi",
    title: "Volumetric 3D Display: Features and Classification",
    year: "2023",
    journal: "Current Optics and Photonics",
    volume: "7",
    number: "6",
    pages: "597–607",
  },
  {
    id: "hart1988",
    author: "Sandra G. Hart and Lowell E. Staveland",
    title: "Development of NASA-TLX (Task Load Index): Results of Empirical and Theoretical Research",
    year: "1988",
    booktitle: "Advances in Psychology",
    volume: "52",
    pages: "139–183",
    doi: "10.1016/S0166-4115(08)62386-9",
  },
  {
    id: "hilliges2012",
    author: "Otmar Hilliges, David Kim, Shahram Izadi, Malte Weiss, and Andrew Wilson",
    title: "HoloDesk: direct 3d interactions with a situated see-through display",
    year: "2012",
    booktitle: "Proceedings of the SIGCHI Conference on Human Factors in Computing Systems",
    pages: "2421–2430",
  },
  {
    id: "hirayama2019",
    author: "Ryuji Hirayama, Diego Martinez Plasencia, Nobuyuki Masuda, and Sriram Subramanian",
    title: "A volumetric display for visual, tactile and audio presentation using acoustic trapping",
    year: "2019",
    journal: "Nature",
    volume: "575",
    number: "7782",
    pages: "320–323",
  },
  {
    id: "huber2015",
    author: "Paul Huber",
    title: "Inaccurate input on touch devices relating to the fingertip",
    year: "2015",
    booktitle: "Media Informatics Proseminar on Interactive Surfaces",
    volume: "31",
  },
  {
    id: "lumi2017",
    author: "Lumi Industries",
    title: "VVD: Volumetric Visualization Device",
    year: "2017",
    url: "https://www.lumindustries.com/3d-vis",
  },
  {
    id: "ishii2012",
    author: "Hiroshi Ishii, Dávid Lakatos, Leonardo Bonanni, and Jean-Baptiste Labrune",
    title: "Radical atoms: beyond tangible bits, toward transformable materials",
    year: "2012",
    journal: "interactions",
    volume: "19",
    number: "1",
    pages: "38–51",
  },
  {
    id: "jankowski2013",
    author: "Jacek Jankowski and Martin Hachet",
    title: "A survey of interaction techniques for interactive 3D environments",
    year: "2013",
    booktitle: "Eurographics 2013-STAR",
  },
  {
    id: "jiang2021",
    author: "Ying Jiang, Congyi Zhang, Hongbo Fu, Alberto Cannavò, Fabrizio Lamberti, Henry Y K Lau, and Wenping Wang",
    title: "HandPainter -3D Sketching in VR with Hand-based Physical Proxy",
    year: "2021",
    booktitle: "Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems (CHI ’21)",
    doi: "10.1145/3411764.3445302",
  },
  {
    id: "jones2007",
    author: "Andrew Jones, Ian McDowall, Hideshi Yamada, Mark Bolas, and Paul Debevec",
    title: "Rendering for an interactive 360° light field display",
    year: "2007",
    journal: "ACM Transactions on Graphics",
    volume: "26",
    number: "3",
    pages: "40",
    doi: "10.1145/1276377.1276427",
  },
  {
    id: "karnik2011",
    author:
      "Abhijit Karnik, Archie Henderson, Andrew Dean, Howard Pang, Thomas Campbell, Satoshi Sakurai, Guido Herrmann, Shahram Izadi, Yoshifumi Kitamura, and Sriram Subramanian",
    title: "Vortex: Design and implementation of an interactive volumetric display",
    year: "2011",
    booktitle: "CHI’11 Extended Abstracts on Human Factors in Computing Systems",
    pages: "2017–2022",
  },
  {
    id: "kimura2011",
    author: "Hidei Kimura, Akira Asano, Issei Fujishiro, Ayaka Nakatani, and Hayato Watanabe",
    title: "True 3D display",
    year: "2011",
    booktitle: "ACM SIGGRAPH 2011 Emerging Technologies",
    pages: "1–1",
  },
  {
    id: "kingsley2012",
    author: "Philip Kingsley, J Rossiter, and S Subramanian",
    title: "eTable: A haptic elastic table for 3D multi-touch interactions",
    year: "2012",
    thesis: "Master’s thesis",
    publisher: "University of Bristol",
  },
  {
    id: "kumagai2021",
    author: "Kota Kumagai, Shun Miura, and Yoshio Hayasaki",
    title: "Colour volumetric display based on holographic-laser-excited graphics using drawing space separation",
    year: "2021",
    journal: "Scientific Reports",
    volume: "11",
    number: "1",
    pages: "22728",
    doi: "10.1038/s41598-02102107-3",
  },
];

// 참고 자료 목록
// [1] 3dconnexion. 2021. Space Mouse 3D input Device. http://www.3dconnexion.fr/ nc/company/press-room/
// [2] Isayas Berhe Adhanom, Paul MacNeilage, and Eelke Folmer. 2023. Eye tracking in virtual reality: a broad review of applications and challenges. Virtual Reality 27, 2 (2023), 1481–1505.
// [3] Ray Asahina, Takashi Nomoto, Takatoshi Yoshida, and YoshihiroWatanabe. 2021. Realistic 3D swept-volume display with hidden-surface removal using physical materials. In 2021 IEEE Virtual Reality and 3D User Interfaces (VR). IEEE, 113–121.
// [4] Ravin Balakrishnan, George W Fitzmaurice, and Gordon Kurtenbach. 2001. User interfaces for volumetric displays. Computer 34, 3 (2001), 37–45.
// [5] Peter C. Barnum, Srinivasa G. Narasimhan, and Takeo Kanade. 2010. A multi-layered display with water drops. In ACM SIGGRAPH 2010 papers. ACM, Los Angeles California, 1–7. https://doi.org/10.1145/1833349.1778813
// [6] Steve Bryson. 2005. Direct Manipulation in Virtual Reality. In Visualization Handbook. Elsevier, 413–430. https://doi.org/10.1016/B978-012387582-2/50023-X
// [7] Tom Carter, Sue Ann Seah, Benjamin Long, Bruce Drinkwater, and Sriram Subramanian. 2013. UltraHaptics: multi-point mid-air haptic feedback for touch surfaces. In Proceedings of the 26th annual ACM symposium on User interface software and technology. 505–514.
// [8] Alvaro Cassinelli and Masatoshi Ishikawa. 2005. Khronos projector. In ACM SIGGRAPH 2005 Emerging technologies on -SIGGRAPH ’05. ACM Press, Los Angeles, California, 10. https://doi.org/10.1145/1187297.1187308
// [9] Dhairya Dand and Robert Hemsley. 2013. Obake: interactions on a 2.5 D elastic display. In Adjunct Proceedings of the 26th Annual ACM Symposium on User Interface Software and Technology. 109–110.
// [10] Nguyen-Thong Dang. 2007. A survey and classifcation of 3D pointing techniques. In 2007 IEEE international conference on research, innovation and vision for the future. IEEE, 71–80.
// [11] S. Eitoku, T. Tanikawa, and Y. Suzuki. 2006. Display Composed of Water Drops for Filling Space with Materialized Virtual Three-dimensional Objects. In IEEE Virtual Reality Conference (VR 2006). 159–166. https://doi.org/10.1109/VR.2006.51 ISSN: 2375-5334.
// [12] Thomas Feix, Javier Romero, Heinz-Bodo Schmiedmayer, Aaron M. Dollar, and Danica Kragic. 2016. The GRASP Taxonomy of Human Grasp Types. IEEE Transactions on Human-Machine Systems 46, 1 (Feb. 2016), 66–77. https://doi. org/10.1109/THMS.2015.2470657
// [13] Unai Javier Fernández, Iosune Sarasate, Iñigo Ezcurdia, Manuel Lopez-Amo, Ivan Fernández, and Asier Marzo. 2024. PointerVol: A Laser Pointer for Swept Volumetric Displays. In Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology (UIST ’24). Association for Computing Machinery, New York, NY, USA, 1–8. https://doi.org/10.1145/3654777.3676432
// [14] Clifton Forlines, Daniel Wigdor, Chia Shen, and Ravin Balakrishnan. 2007. Direct-touch vs. mouse input for tabletop displays. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (San Jose, California, USA) (CHI ’07). Association for Computing Machinery, New York, NY, USA, 647–656. https://doi.org/10.1145/1240624.1240726
// [15] Tatsuki Fushimi, Asier Marzo, Bruce W Drinkwater, and Thomas L Hill. 2019. Acoustophoretic volumetric displays using a fast-moving levitated particle. Applied Physics Letters 115, 6 (2019).
// [16] E Bruce Goldstein and James R Brockmole. 2002. Sensation and perception. Vol. 90. Wadsworth-Thomson Learning Pacifc Grove, CA, USA.
// [17] Tovi Grossman and Ravin Balakrishnan. 2006. The design and evaluation of selection techniques for 3D volumetric displays. In Proceedings of the 19th annual ACM symposium on User interface software and technology. 3–12.
// [18] Tovi Grossman, Daniel Wigdor, and Ravin Balakrishnan. 2004. Multi-fnger gestural interaction with 3d volumetric displays. In Proceedings of the 17th annual ACM symposium on User interface software and technology. 61–70.
// [19] Joonku Hahn, Woonchan Moon, Hosung Jeon, Minwoo Jung, Seongju Lee, Gunhee Lee, and Muhan Choi. 2023. Volumetric 3D Display: Features and Classifcation. Current Optics and Photonics 7, 6 (2023), 597–607.
// [20] Sandra G. Hart and Lowell E. Staveland. 1988. Development of NASA-TLX (Task Load Index): Results of Empirical and Theoretical Research. In Advances in Psychology. Vol. 52. Elsevier, 139–183. https://doi.org/10.1016/S0166-4115(08) 62386-9
// [21] Otmar Hilliges, David Kim, Shahram Izadi, Malte Weiss, and Andrew Wilson. 2012. HoloDesk: direct 3d interactions with a situated see-through display. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems. 2421–2430.
// [22] Ryuji Hirayama, Diego Martinez Plasencia, Nobuyuki Masuda, and Sriram Subramanian. 2019. A volumetric display for visual, tactile and audio presentation using acoustic trapping. Nature 575, 7782 (2019), 320–323.
// [23] Paul Huber. 2015. Inaccurate input on touch devices relating to the fngertip. Media Informatics Proseminar on” Interactive Surfaces 31 (2015).
// [24] Lumi Industries. 2017. VVD: Volumetric Visualization Device. https://www. lumindustries.com/3d-vis
// [25] Hiroshi Ishii, Dávid Lakatos, Leonardo Bonanni, and Jean-Baptiste Labrune. 2012. Radical atoms: beyond tangible bits, toward transformable materials. interactions 19, 1 (2012), 38–51.
// [26] Jacek Jankowski and Martin Hachet. 2013. A survey of interaction techniques for interactive 3D environments. In Eurographics 2013-STAR.
// [27] Ying Jiang, Congyi Zhang, Hongbo Fu, Alberto Cannavò, Fabrizio Lamberti, Henry Y K Lau, and Wenping Wang. 2021. HandPainter -3D Sketching in VR with Hand-based Physical Proxy. In Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems (Yokohama, Japan) (CHI ’21). Association for Computing Machinery, New York, NY, USA, Article 412, 13 pages. https: //doi.org/10.1145/3411764.3445302
// [28] Andrew Jones, Ian McDowall, Hideshi Yamada, Mark Bolas, and Paul Debevec. 2007. Rendering for an interactive 360° light feld display. ACM Transactions on Graphics 26, 3 (July 2007), 40. https://doi.org/10.1145/1276377.1276427
// [29] Abhijit Karnik, Archie Henderson, Andrew Dean, Howard Pang, Thomas Campbell, Satoshi Sakurai, Guido Herrmann, Shahram Izadi, Yoshifumi Kitamura, and Sriram Subramanian. 2011. Vortex: Design and implementation of an interactive volumetric display. In CHI’11 Extended Abstracts on Human Factors in Computing Systems. 2017–2022.
// [30] Hidei Kimura, Akira Asano, Issei Fujishiro, Ayaka Nakatani, and Hayato Watanabe. 2011. True 3D display. In ACM SIGGRAPH 2011 Emerging Technologies. 1–1.
// [31] Philip Kingsley, J Rossiter, and S Subramanian. 2012. eTable: A haptic elastic table for 3D multi-touch interactions. Master’s thesis. University of Bristol (2012).
// [32] Kota Kumagai, Shun Miura, and Yoshio Hayasaki. 2021. Colour volumetric display based on holographic-laser-excited graphics using drawing space separation. Scientifc Reports 11, 1 (Nov. 2021), 22728. https://doi.org/10.1038/s41598-02102107-3

// 인용 관리를 위한 변수
let citationsInDocument = [];

// LaTeX to HTML 컨버터
function parseLatex(latexCode) {
  let content = "";
  let title = "";
  let author = "";
  let date = "";
  let abstract = "";
  let inDocument = false;
  let inAbstract = false;
  let inFigure = false;
  let inTable = false;
  let inEnumerate = false;
  let inItemize = false;
  let currentSection = "";
  let figureCaption = "";
  let tableCaption = "";

  // 캡션 번호 관리를 위한 카운터
  let figureCount = 0;
  let tableCount = 0;

  // 인용 목록 초기화
  citationsInDocument = [];

  // 표/수식/이미지 파싱을 위한 임시 버퍼
  let tableBuffer = [];
  let inTabular = false;

  // 정규식 기반 파싱
  const lines = latexCode.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 제목 추출
    if (line.startsWith("\\title{")) {
      title = line.substring(7, line.length - 1);
    }
    // 저자 추출
    else if (line.startsWith("\\author{")) {
      author = line.substring(8, line.length - 1);
    }
    // 날짜 추출
    else if (line.startsWith("\\date{")) {
      date = line.substring(6, line.length - 1);
    }
    // 문서 시작
    else if (line.startsWith("\\begin{document}")) {
      inDocument = true;
    }
    // 문서 종료
    else if (line.startsWith("\\end{document}")) {
      inDocument = false;
    }
    // 제목 생성 명령
    else if (line === "\\maketitle" && inDocument) {
      content += `<h1 class="title">${title}</h1>`;
      content += `<div class="author">${author}</div>`;
      if (date) {
        content += `<div class="date">${date || "April 21, 2025"}</div>`;
      }
    }
    // 초록 시작
    else if (line.startsWith("\\begin{abstract}") && inDocument) {
      inAbstract = true;
      content += `<div class="abstract"><div class="abstract-title">Abstract</div>`;
    }
    // 초록 종료
    else if (line.startsWith("\\end{abstract}") && inDocument) {
      inAbstract = false;
      content += `</div>`;
    }
    // 섹션 제목
    else if (line.startsWith("\\section{") && inDocument) {
      currentSection = line.substring(9, line.length - 1);
      content += `<h2 class="section">${currentSection}</h2>`;
    }
    // 서브섹션 제목
    else if (line.startsWith("\\subsection{") && inDocument) {
      const subsection = line.substring(12, line.length - 1);
      content += `<h3 class="subsection">${subsection}</h3>`;
    }
    // 그림 시작
    else if (line.startsWith("\\begin{figure}") && inDocument) {
      inFigure = true;
      figureCount++;
      content += `<div class="figure">`;
    }
    // 그림 종료
    else if (line.startsWith("\\end{figure}") && inDocument) {
      inFigure = false;
      content += `</div>`;
    }
    // 테이블 시작
    else if (line.startsWith("\\begin{table}") && inDocument) {
      inTable = true;
      tableCount++;
      content += `<div class="table-container">`;
    }
    // 테이블 종료
    else if (line.startsWith("\\end{table}") && inDocument) {
      inTable = false;
      if (tableCaption) {
        content += `<div class="table-caption">${tableCaption}</div>`;
        tableCaption = "";
      }
      content += `</div>`;
    }
    // 테이블 내용 시작
    else if (line.startsWith("\\begin{tabular}") && inDocument && inTable) {
      inTabular = true;
      tableBuffer = [];
    }
    // 테이블 내용 종료
    else if (line.startsWith("\\end{tabular}") && inDocument && inTable) {
      // 표 렌더링
      content += renderLatexTable(tableBuffer);
      inTabular = false;
      tableBuffer = [];
    }
    // 테이블 행 (tabular 내부)
    else if (inTabular && !line.startsWith("%")) {
      tableBuffer.push(line);
    }
    // 번호 목록 시작
    else if (line.startsWith("\\begin{enumerate}") && inDocument) {
      inEnumerate = true;
      content += `<ol class="enumerated-list">`;
    }
    // 번호 목록 종료
    else if (line.startsWith("\\end{enumerate}") && inDocument) {
      inEnumerate = false;
      content += `</ol>`;
    }
    // 글머리 기호 목록 시작
    else if (line.startsWith("\\begin{itemize}") && inDocument) {
      inItemize = true;
      content += `<ul class="itemized-list">`;
    }
    // 글머리 기호 목록 종료
    else if (line.startsWith("\\end{itemize}") && inDocument) {
      inItemize = false;
      content += `</ul>`;
    }
    // 목록 항목
    else if (line.startsWith("\\item") && (inEnumerate || inItemize)) {
      const itemContent = line.substring(5).trim();
      content += `<li>${itemContent}</li>`;
    }
    // 캡션
    else if (line.startsWith("\\caption{") && inDocument) {
      const captionContent = line.substring(9, line.length - 1);

      // 라벨 제거
      let cleanCaption = captionContent.replace(/\\label\{.*?\}/g, "").trim();

      // 캡션 번호 붙이기
      if (inFigure) {
        content += `<div class="figure-caption">Figure ${figureCount}: ${cleanCaption}</div>`;
      } else if (inTable) {
        tableCaption = `Table ${tableCount}: ${cleanCaption}`;
      }
    }
    // 이미지 (figure 환경 외부도 지원)
    else if (line.includes("\\includegraphics") && inDocument) {
      // 이미지 경로 추출
      const match = line.match(/\\includegraphics(\[.*?\])?\{(.+?)\}/);
      if (match) {
        let src = match[2];
        // frog.jpg는 첨부 이미지, 그 외는 외부 링크
        if (src === "frog.jpg") {
          content += `<img src="frog.jpg" alt="Frog">`;
        } else {
          content += `<img src="${src}" alt="LaTeX Image">`;
        }
      }
    }
    // 수식 블록 (display math)
    else if ((line.startsWith("\\[") && line.endsWith("\\]")) || (line.startsWith("$$") && line.endsWith("$$"))) {
      // \[ ... \] 또는 $$ ... $$ 한 줄
      const mathContent = line
        .replace(/^\\\[|\\\]$/g, "")
        .replace(/^\$\$|\$\$$/g, "")
        .trim();
      content += `<div class="math-block">\\[${mathContent}\\]</div>`;
    }
    // 여러 줄 수식 블록 시작
    else if ((line.startsWith("\\[") && !line.endsWith("\\]")) || (line.startsWith("$$") && !line.endsWith("$$"))) {
      // 여러 줄 블록 수식
      let mathLines = [];
      let endFound = false;
      let j = i;
      while (j < lines.length && !endFound) {
        let l = lines[j].trim();
        if ((l.endsWith("\\]") && l.length > 2) || (l.endsWith("$$") && l.length > 2)) {
          endFound = true;
          l = l.replace(/^\\\[|^\$\$|\\\]$|\$\$$/g, "");
          mathLines.push(l);
        } else if (j === i) {
          l = l.replace(/^\\\[|^\$\$/g, "");
          mathLines.push(l);
        } else {
          mathLines.push(l);
        }
        j++;
      }
      content += `<div class="math-block">\\[${mathLines.join("\n")}\\]</div>`;
      i = j - 1;
    }
    // 테이블 행
    else if (line.includes("&") && inTable && !line.startsWith("%")) {
      // 테이블 헤더인지 확인
      const isHeader = line.includes("\\hline");

      // & 기호로 셀 분리
      let cells = line.split("&").map((cell) => cell.trim());

      // \\ 및 \hline 제거
      for (let j = 0; j < cells.length; j++) {
        cells[j] = cells[j]
          .replace(/\\\\.*$/, "")
          .replace(/\\hline/g, "")
          .trim();
      }

      // 행 생성
      if (cells.length > 0) {
        content += "<tr>";
        for (let j = 0; j < cells.length; j++) {
          if (isHeader) {
            content += `<th>${cells[j]}</th>`;
          } else {
            content += `<td>${cells[j]}</td>`;
          }
        }
        content += "</tr>";
      }
    }
    // 일반 텍스트
    else if (inDocument && line.length > 0 && !line.startsWith("%")) {
      if (inAbstract) {
        abstract += line + " ";
      } else if (!inFigure && !inTable && !inEnumerate && !inItemize && !inTabular) {
        let processedLine = line;

        // \href 처리
        const hrefRegex = /\\href\{([^}]*)\}\{([^}]*)\}/g;
        processedLine = processedLine.replace(hrefRegex, '<a href="$1" target="_blank">$2</a>');

        // \url 처리
        const urlRegex = /\\url\{([^}]*)\}/g;
        processedLine = processedLine.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');

        // \ref 처리
        const refRegex = /\\ref\{([^}]*)\}/g;
        processedLine = processedLine.replace(refRegex, "1"); // 간단히 1로 대체

        // \cite 처리
        const citeRegex = /\\cite\{([^}]*)\}/g;
        let citeMatch;
        while ((citeMatch = citeRegex.exec(processedLine)) !== null) {
          const keys = citeMatch[1].split(",").map((key) => key.trim());
          let replacement = "";

          keys.forEach((key) => {
            // 인용 목록에 추가 (중복 방지)
            if (!citationsInDocument.includes(key)) {
              citationsInDocument.push(key);
            }

            // 인용 번호 찾기
            const citeIndex = citationsInDocument.indexOf(key);

            // 인용 링크 생성
            const ref = references.find((r) => r.id === key);
            if (ref) {
              replacement += `<a href="#ref-${key}" class="citation-link" data-key="${key}" title="${ref.title} (${ref.author}, ${ref.year})">[${citeIndex}]</a>`;
            } else {
              replacement += `[${citeIndex}]`;
            }
          });

          processedLine = processedLine.replace(citeMatch[0], replacement);
        }

        // \LaTeX 처리
        const latexRegex = /\\LaTeX\{\}/g;
        processedLine = processedLine.replace(latexRegex, "LaTeX");

        // 인라인 수식 처리: $...$
        // 개선: 텍스트와 수식을 분리하여 각각 <span> 또는 <div>로 출력
        let lineParts = [];
        let lastIndex = 0;
        // 인라인 수식 ($...$)
        const inlineMathRegex = /\$([^\$]+)\$/g;
        let match;
        while ((match = inlineMathRegex.exec(processedLine)) !== null) {
          if (match.index > lastIndex) {
            lineParts.push({
              type: "text",
              value: processedLine.slice(lastIndex, match.index),
            });
          }
          lineParts.push({
            type: "math-inline",
            value: match[1],
          });
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < processedLine.length) {
          lineParts.push({
            type: "text",
            value: processedLine.slice(lastIndex),
          });
        }
        // 만약 수식이 없으면 기존처럼 처리
        if (lineParts.length === 0) {
          content += `<p>${processedLine}</p>`;
        } else {
          lineParts.forEach((part) => {
            if (part.type === "text") {
              // 텍스트는 <p>로 감싸서 출력
              if (part.value.trim() !== "") {
                content += `<p>${part.value}</p>`;
              }
            } else if (part.type === "math-inline") {
              // 2차원 수식 표현: display 스타일로 렌더링 (블록 수식)
              content += `<div class="math-block">\\[${part.value}\\]</div>`;
            }
          });
        }
      }
    }
  }

  // 초록 내용이 있으면 추가
  if (abstract) {
    if (content.includes('<div class="abstract"><div class="abstract-title">Abstract</div></div>')) {
      content = content.replace(
        '<div class="abstract"><div class="abstract-title">Abstract</div></div>',
        `<div class="abstract"><div class="abstract-title">Abstract</div>${abstract}</div>`
      );
    } else if (!content.includes(abstract)) {
      // If abstract content not found in the HTML but exists
      const titleIndex = content.indexOf('<div class="abstract"><div class="abstract-title">Abstract</div>');
      if (titleIndex > -1) {
        const insertIndex = titleIndex + '<div class="abstract"><div class="abstract-title">Abstract</div>'.length;
        content = content.substring(0, insertIndex) + abstract + content.substring(insertIndex);
      }
    }
  }

  // 참고 문헌 섹션 추가
  if (content.includes("\\References{sample}")) {
    let referencesSection = `<h2 class="section">References</h2><div class="references-list">`;

    // 모든 references를 순서대로 출력
    references.forEach((ref, index) => {
      let refHtml = `<div class="reference-item" id="ref-${ref.id}">`;
      refHtml += `<span class="reference-number">[${index + 1}]</span> `;
      refHtml += `<span class="reference-text">`;
      refHtml += `${ref.author}, "${ref.title}", `;

      if (ref.journal) {
        refHtml += `<em>${ref.journal}</em>, `;
        if (ref.volume) refHtml += `vol. ${ref.volume}, `;
        if (ref.number) refHtml += `no. ${ref.number}, `;
        if (ref.pages) refHtml += `pp. ${ref.pages}, `;
      } else if (ref.publisher) {
        refHtml += `<em>${ref.publisher}</em>, `;
      }

      refHtml += `${ref.year}.`;
      refHtml += `</span>`;
      refHtml += `</div>`;

      referencesSection += refHtml;
    });

    referencesSection += `</div>`;

    // 참고 문헌 섹션 추가
    content = content.replace(/\\References\{sample\}/g, referencesSection);
  }

  return content;
}

// 표(tabular) 환경을 HTML로 변환
function renderLatexTable(tableLines) {
  let html = "<table>";
  let headerDone = false;
  for (let line of tableLines) {
    if (!line.trim()) continue;
    // \hline은 무시
    if (line.includes("\\hline")) continue;
    // 행 분리
    let row = line.replace(/\\\\$/, "").trim();
    let cells = row.split("&").map((cell) => cell.trim());
    html += "<tr>";
    for (let cell of cells) {
      // \textbf{...}를 <b>...</b>로 변환
      cell = cell.replace(/\\textbf\{([^}]*)\}/g, "<b>$1</b>");
      if (!headerDone) {
        html += `<th>${cell}</th>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    }
    html += "</tr>";
    headerDone = true;
  }
  html += "</table>";
  return html;
}

// 파일 클릭 이벤트 처리
function handleFileClick(event) {
  // 파일 항목 클릭 시
  const fileItems = document.querySelectorAll(".file-item");
  fileItems.forEach((item) => {
    item.classList.remove("active");
  });

  // 클릭한 항목 활성화
  const clickedItem = event.currentTarget;
  clickedItem.classList.add("active");
}

// 페이지 로드 시 초기화
// 참조 관련 변수와 함수들

// 인용 링크 클릭 이벤트 핸들러
function handleCitationClick(event) {
  // Since we're using normal anchor links now, just add highlighting behavior
  if (event.target.classList.contains("citation-link")) {
    const key = event.target.getAttribute("data-key");
    const refElement = document.getElementById(`ref-${key}`);

    if (refElement) {
      // Add a delay to allow the browser's default scroll to complete
      setTimeout(() => {
        // 강조 효과
        refElement.classList.add("highlight");
        setTimeout(() => {
          refElement.classList.remove("highlight");
        }, 2000);
      }, 100);
    }
  }
}

window.onload = function () {
  // LaTeX 소스 코드
  latexSource = `\\documentclass{article}
  % Language setting
  % Replace \`english' with e.g. \`spanish' to change the document language
  \\usepackage[english]{babel}

  % Set page size and margins
  % Replace \`letterpaper' with \`a4paper' for UK/EU standard size
  \\usepackage[letterpaper,top=2cm,bottom=2cm,left=3cm,right=3cm,marginparwidth=1.75cm]{geometry}

  % Useful packages
  \\usepackage{amsmath}
  \\usepackage{graphicx}
  \\usepackage[colorlinks=true, allcolors=blue]{hyperref}

  \\title{PointerVol: A Laser Pointer for Swept Volumetric Displays}
  \\author{Authors: Unai Javier Fernández, Iosune Sarasate, Iñigo Ezcurdia, Manuel López-Amo, Iván Fernández, Asier Marzo∗}

  \\begin{document}
  \\maketitle

  \\begin{abstract}
  A laser pointer is a commonly used device that does not require communication with the display system or modifications on the applications, the presenter can just take a pointer and start using it. When a laser pointer is used on a volumetric display, a line rather than a point appears, making it not suitable for pointing at 3D locations. PointerVol is a modified laser pointer that allows users to point to 3D positions inside a swept volumetric display. We propose two PointerVol implementations based on timing and distance measurements, we evaluate the pointing performance using them. Finally, we present other features such as multi-user pointing, line patterns and a multi-finger wearable. PointerVol is a simple device that can help to popularize volumetric displays, or at least to make them more usable for presentations with true-3D content.
  \\end{abstract}

  \\section{Introduction}

  Laser pointers are commonly used with slides projected on a fat screen. Despite its simplicity, laser pointers are widespread given that they work out-of-the-box and do not require communication with the display system or modifcations on the applications software. A presenter takes the laser pointer out, and just points to the parts that wants to highlight on a screen.
Graphics on a fat screen can provide monocular cues such as occlusion, distance-size relationship, shadows or texture gradients
[10] but binocular disparity, accommodation of the focal point or convergence cannot be rendered. Diferently, in a true-3D display [19], the graphics can be viewed by multiple people from diferent angles with binocular disparity and focus accommodation; also, they do not force the users to wear any device. Volumetric displays are one of the main technologies for rendering true-3D graphics [33].
Volumetric displays provide unique advantages when compared to virtual reality glasses and can cover diferent context-of-uses (e.g., museum exhibits). They provide convergence and accommodation of the focal point [33]. Volumetric displays do not force the users to wear any device, thus having lower setup time, being hygienic, and allowing the come-and-interact paradigm where users just approach the system and start using it.
The use of true-3D graphics has been evaluated for education [16, 35], medicine [5, 9, 11] or computer-aided design [7, 21]. It is particularly interesting for collaborative scenarios [14], where multiple users can observe true-3D graphics from diferent angles in a natural way. A business report [31], valued this market at 690M in 2022 and estimates a 1.8B value in 2030, with various established companies (Voxon Photonics, Holoxica Limited or Leia Inc. to name a few).
One major limitation for the adoption of volumetric displays can be the lack of standardised techniques, widgets or input devices. There are some proposals and solutions (see Related Work 2.3), but they require external hardware, communication with the display system, or modifying the applications software.
A simple device, similar to a laser pointer, that could directly be
used with a volumetric display would enhance the benefts of presenting with true-3D graphics rather than on a fat screen. However,
 
when a regular laser pointer is shined upon a volumetric display, a line becomes visible along the display volume, making it hard to point to a specific 3D position.
In this paper, we modify a regular laser pointer in two different ways. The first method, pulses the laser at the same frequency as the sweeping screen and adjust the phase to display the laser dot at specific heights, the height is adjusted with an analog joystick. The second method, measures the distance from the pointer to the screen and activates the laser at specific distances.
Firstly, we analyze depth perception and pointing with two dif-ferent pointer patterns (only dot, and dashed line + dot). Then, we evaluate the two methods for pointing in 3D. Finally, we propose other pointing possibilities that go beyond the simple pointer.
PointerVol is a simple device that can be used out-of-the-box with existing displays and applications. Hand-tracking or other methods covered in Section 2.3 could enable richer interactions, but they would require to integrate sensors in the existing displays or modifcations in the software.

  \\section{Related Work}
  2.1	Laser Pointers 
  Laser pointers are hand-held pen-shaped devices that switch on a laser (usually a < 5mW diode, Class I) when the button is pressed, the user can naturally point with it to diferent points. They are commonly used to direct the attention of viewers to graphics projected on a fat screen. They can also be used to point to stars on a planetarium dome, to guide people to real locations, or to indicate which objects should be grasped and where they should be put (for example when explaining a doctor how to put a new prosthetic hip replacement).
Laser pointers are the evolution of physical sticks and wands that were used for presentations on whiteboards and posters. In the HCI literature, there are several works that detect the laser pointer and use its position to interact [20, 27] or transmit it to remote locations [30]. The pointing performance of regular laser pointers have also been evaluated [24]. Yet, to our knowledge, no simple modifications of laser pointers for interacting with volumetric displays are reported in the literature.
There is extensive work using pico-projectors in the realm of spatial augmented reality, for example to guide users on maps [4], augment a patient’s body [26] or to play with projections on the wall
[36]; but we consider that these systems are application-specifc and not an universal pointer.
 2.2	Volumetric Displays
A volumetric display emits light from each point within a volume [3]. In swept volumetric displays, a translucent platform called difuser is synchronously moved through the projection zone while a projector emits the slice of the scene that corresponds to the current position of the difuser. With difuser oscillations above 20Hz, due to persitence of vision, users perceived the discrete 2D projections as a simultaneous 3D volume.
There are other types of true-3D displays such as plasma displays that induce electric breakdown in mid-air using focused laser [29], non-linear optical media (e.g., two photon-absorption [22] or dual wave-length fuorescent [28]), or tracer particles held and moved with optical [32] or acoustic [8, 17] tweezers. Yet, swept volumetric displays remain as the most widespread available type, with commercial products from Voxon Photonics VX1 [23].
2.3	    [[[[[[[[[[[[[[[ 문제1 ]]]]]]]]]]]]]]]    techniques in Volumetric dispalys 
Several pointing or selection techniques have been developed for 3D environments [6] that were later adapted to volumetric displays [12]. The point and ray cursors are the two main categories, being the ray cursor slightly superior. In it, a ray is projected from the pointer and a disambiguation technique is needed when the ray intersects multiple objects. The best results were from the depth ray, where there is a marker along the selection ray that can be moved with the distance from the pointer to the display. The lock ray was another technique in which the marker could be controlled with inputs from the pointer device.
A conceptual paper on interactions with volumetric displays
[2] suggests other possibilities that go beyond pointing devices, for example using the fngers of the hand. Some of these techniques were implemented [15] to use the hand in the same way as a pointing device for selection. Another modality was to touch the display boundary (usually the protective case), this was initially emulated using augmented reality [25] and later implemented in a real volumetric display with infrared sensing of the contacts with the transparent dome case [18].
In the commercial Voxon VX1 toolkit [23], it is possible to interact with 3D models in a regular PC, for example using Blender, and employ the volumetric display only for rendering the result. The other common interaction modality is through the use of a 3D-mouse [1].
Those interactions need to be implemented in the application, extra hardware such as input devices or cameras are required, or in general, interconnection with the display system is required. The aim of PointerVol is to be a simple device that can directly be used to point inside the true-3D graphics rendered in a swept volumetric display.

  \\section{POINTERVOL DEVICES}
  We present two PointerVol devices. In one the depth of the point along the intersection line with the display volume is controlled with an analog joystick (Figure 4 ). On the second method, the depth is adjusted with the distance from the pointer to the display (Figure 5 ). They are somehow equivalent to the depth ray and the lock ray techniques which showed good results for volumetric displays [13]. The devices used an Arduino Nano as the microcontroller, and a 9V rechargeable battery as the power source. They had a 1 mW red laser diode driven by a 2N2222 transistor. Their casing and insides are shown in Figure 1. The schematics and source code are attached
as supplementary material.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure1.png}
  \\caption{\\label{Figure 1} Hardware implementation of PointerVol devices: A,C) Joystick control. B,D) distance control.}
  \\end{figure}
  
3.1	Joystick-controlled depth
The laser switches on at the confgured frequency (that matches the oscillation of the display) and with the analog joystick, the phase can be changed to make the laser appear at diferent heights (Figure 2).
The pointing device saves the oscillation frequency of the display, it can be adjusted by pressing a button to enter adjust mode, and then with the analog stick. The user knows that the pointer is synchronized with the display when the point is static and does not drift.
More complex timing patterns can be used for example to create a dashed line with a dot on the pointing position. This is shown in Figure 3.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure2.png}
  \\caption{\\label{Figure 2} Synchronizing the laser to the frequency of oscillation of the device, the phase controls at which          [[[[[[[[[[[[[[[ 문제2 ]]]]]]]]]]]]]]]            the laser dot appears.}
  \\end{figure}

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure3.png}
  \\caption{\\label{Figure 3} Line patterns on PointerVol: a solid line, a single point, and a dashed line plus a point.}
  \\end{figure}

We note that the frequency needs to be adjusted only once per display and that by default the 30 Hz, makes the laser only drift 5 mm per minute in a Voxon VX1 using an Arudino Nano as the microcontroller (Timer 1 at 16 MHz resolution).

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure4.png}
  \\caption{\\label{Figure 4} PointerVol that controls the depth with an analog joystick.}
  \\end{figure}

3.2	Distance-controlled depth
The depth of the dot along the line is determined by the distance between the pointer and the display. That way, it gives the illusion that the dot appears at a fxed distance from the pointer. This pointer has a button to reset the distance, when it is pressed it makes the current distance the one from the centre of the display to the pointer. 

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure5.png}
  \\caption{\\label{Figure 5} PointerVol that controls the depth with the distance between the pointer and the display.}
  \\end{figure}

We used an ultrasonic range sensor (hc-sr04) that provides 150 samples per second when it is one meter away from the surface, and a maximum angle of 15◦. We modified the  [[[[[[[[[[[[[[[ 문제3 ]]]]]]]]]]]]]]]            to pulse with 30 Vpp instead of 5 Vpp instead of 5 Vpp and thus increase the angle to 25◦. Ultrasound requires that the difuser is directly exposed so the protective dome cannot be used. We also explored a LIDAR sensor, but the sampling rate of compact devices was too low (below 30 samples per second) and unreliable due to the translucency of the difuser.
We added distance prediction to the software assuming a sinusoidal oscillation of the difuser on this display (Figure 6). Also the distances read by the sensor were corrected according to the time of flight of sound.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure6.png}
  \\caption{\\label{Figure 6} Difuser position prediction.}
  \\end{figure}

  \\section{USER     [[[[[[[[[[[[[[[ 문제4 ]]]]]]]]]]]]]]]           }
The frst study checks if a single dot is better than a dashed line + dot for pointing to specifc depths (Depth). Depth perception is an advantage of Volumetric Displays [13] and depth is the main addition of PointerVol over a regular laser. The second study (Pointing) compares the pointing performance of a PointerVol controlled with a joystick or distance. In the third study (Tracing), the accuracy is compared when the user traces along diferent 3D paths. These studies compare the two PointerVol devices in tasks related to pointing and tracing objects usually rendered in volumetric displays. They aim at revealing when joystick-mode or distance-mode should be used.
The studies were conducted with a total of 18 participants (self-reported gender, 8 female and 10 male), aged 20 to 57 years old (AVG=32.83, SD=10.32). The studies took an average of 45 minutes (Depth 10, Point 15, Trace 15 minutes). The participants were staf from engineering departments of the university, their relatives or friends.
The user studies have been approved by the ethics, data protection and biosecurity comitee of the university (PI-011/22) and
conducted according to the pertinent legislation.

4.1 Depth

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure7.png}
  \\caption{\\label{Figure 7} Left) volumetric graphics used for the depth       [[[[[[[[[[[[[[[ 문제5 ]]]]]]]]]]]]]]]        study. Right) Trials used for pointing and tracing.}
  \\end{figure}

4.1.1 Procedure. The user was shown a volumetric scene consisting of 4 fat horizontal slices labelled from 1 to 4 (Figure 7.left). The users were siting on a chair in front of the display at an approximate viewing angle of 30◦ and 30 cm distance, they were allowed to tilt and move the head.
The users were asked to place the dot between two layers indicated by the conductor (e.g. place the dot between the second and the third layer). Prior to the study, the user was told to place the dot as centred as possible in the slice and report to the conductor when they felt it was properly positioned. The conditions were counterbalanced, pointing with a single dot VS dot+dashed line (Figure 3). Two cameras were placed at the sides of the volumetric display to capture the position of the laser pointer.

Task Completion Time (TCT), and accuracy were measured. The NASA TLX subjective questionnaire was flled in using a 7-point Likert scale, with the questions being: Q1—The mental efort necessary to use this method is high; Q2—The physical efort necessary to use this method is high; Q3—The dynamic of the activity has been very fast; Q4—I have felt successful at doing the activities; Q5—I had to put lots of efort to do the activities; Q6—I felt frustrated while doing the activities. After it, the user was also asked to choose their overall preferred method (dot VS dot + guiding line).
We selected Completion Time and Accuracy (opposite of error rate) because they were used in previous studies with volumetric displays [12, 13]. We did not employed Fitt’s law given the potential challenges of using it in 3D [34]. NASA TLX was preferred over SUS because it is better suited for simple pointing devices (no interacting modes or confgurations); and our tasks could be mentally or physically demanding.

4.1.2 Results. 
Task completion time, accuracy and NASA TLX are shown respectively in Figures 8 and 9. Overall 10 out of 18 users preferred the single dot.        [[[[[[[[[[[[[[[ 문제6 ]]]]]]]]]]]]]]]        , TCT is lower and positioning accuracy is better with the dot but not signifcantly. The NASA scores do not reveal any major diferences. In Figure 10, the accumulated pointer of a trial is shown. For the rest of the studies, we will use a single dot as the pointer.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure8.png}
  \\caption{\\label{Figure 8} Task completion time and positioning accuracy for the depth study. Error bars represent standard error.}
  \\end{figure}
    
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure9.png}
  \\caption{\\label{Figure 9} NASA TLX questionnaire for the depth study.}
  \\end{figure}
  
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure10.png}
  \\caption{\\label{Figure 10} Accumulated cursor positions for a     [[[[[[[[[[[[[[[ 문제7 ]]]]]]]]]]]]]]]            on a depth study.}
  \\end{figure}
  
  Some comments mentioned: "I think that the point and line method can be more accurate but I prefer visualization and simplicity", "The point is cleaner. It’s hard for me to perceive depth from a single point of view, but I like to move my head.", "the point and line one, by marking the limits, is easier since it is a depth reference", "point and line feels simpler, but dot is more natural", "It is easier to visualize the point since I focus on which layer the point is located and not on the slope".
  
  4.2	Pointing
4.2.1	Procedure. A scene with fve diferent shapes (a star, a sphere, a cube, a pyramid and an icosahedron) was displayed (Figure 7.right, last sub image). The user was asked to point at a specifc one as fast an accurate as possible. The conditions were using the depth controlled with the Joystick and with distance. Measurements were TCT and accuracy. The user could test the devices before starting the trials.

4.2.2	results. Task completion time and accuracy are shown in Figure 11. No signifcant diferences were found although the distance method was slightly better, also 17 out of 18 users preferred the distance method. NASA TLX and free comments are shown together with the next study.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure11.png}
  \\caption{\\label{Figure 11} Task completion time and accuracy for the pointing study.}
  \\end{figure}

4.3	Tracing
4.3.1	procedure. The user was asked to trace along 3            [[[[[[[[[[[[[[[ 문제8 ]]]]]]]]]]]]]]]            paths: a torus, a torus tilted on the Z axis and a pipe (Figure 7.right). The user was asked to start with the dot at the starting point of the pipe or at any position of the torus. After the user felt ready, they were asked to trace the shape avoiding to get out of its boundaries. Measurements were TCT and accuracy. NASA TLX was also reported by the users.

4.3.2	results. TCT, accuracy and NASA TLX are shown in Figures 12, 13, 14 respectively. 17 out of 18 users preferred the distance method. A trace for a trial on the torus is shown in Figure 15.

In general, the distance method was faster (signifcantly for tilted torus and pipe) but the joystick was more accurate (signifcantly for tilted torus). In the NASA TLX, the joystick was reported as much more mental demanding (Q1), requiring slightly more efort (Q5) and frustrating (Q6). Also, with the distance method people felt the activities more dynamic and successful (Q3 and Q4).

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure12.png}
  \\caption{\\label{Figure 12} Task completion time for the tracing task.}
  \\end{figure}

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure13.png}
  \\caption{\\label{Figure 13} Accuracy on the tracing task: the percentage of captured frames where the projected dot was inside the boundaries of the shape of the two orthogonal cameras.}
  \\end{figure}

Some comments from the users were: "The distance is more intuitive", "Without a joystick I found it easier mentally", "I prefer distance although it’s hard to keep your arm at the same height", "distance more intuitive but I feel less in control", "When the movement is up and down only it is more comfortable with a joystick, but when moving in three-dimensions the handling of depth with your own physical movement is more intuitive", "Once used to the joystick it can be my favorite method".
  
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure14.png}
  \\caption{\\label{Figure 14} NASA TLX questionnaire for the pointing and tracing user study}
  \\end{figure}
    
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure15.png}
  \\caption{\\label{Figure 15} Accumulated pointer positions while tracing a torus.}
  \\end{figure}
              
  \\section{DISCUSSION}
                   [[[[[[[[[[[[[[[ 문제9 ]]]]]]]]]]]]]]]           , the dot was preferred overthe dashed line + dot given that it was simpler and occluded less the rest of the graphics. Controlling the depth was preferred to be done with the distance between the pointer and the display, although the joystick provided more accuracy and could be favoured by power users or for more static pointing.

5.1 Other pointer modalities
During the development of PointerVol, we explored other techniques to enable 3D pointing but that were out of the scope for a controlled user study.

5.1.1 Surface Detection Pointer. Inspired by the light-guns used in games such as Duck Hunt (Nintendo) or Time Crisis (Namco), we combined a light detector with a laser pointer for being able to project automatically a laser on the surfaces of the displayed 3D graphics. The device has an aperture with a lens that focus the incoming light into the light detector, an opamp circuit amplifes the signal for the microcontroller. When light is detected, the laser is fred. A dichroic cube is used to combine the laser and the light detector, to make them point along the same line of view. In the default confguration, the laser appears on each graphic face that it points to, and an analog joystick can be used to adjusted the time ofset and thus project above or below any surface. The analog stick is also used to adjust the sensitivity of the light sensor. The device is shown in Figure 16.
     
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure16.png}
  \\caption{\\label{Figure 16} A PointerVol that can project on top of the surfaces of graphics rendered in swept volumetric displays. The light sensor detects when there is light in the line of sight,and switches on the laser.}
  \\end{figure}
                   
The method works better when aiming at fat surfaces, such as some GUI components or terrain maps. It has difculties when detecting surfaces composed of multiple small slices and sparse volumetric graphics. In general, the light level had to be adapted for a specifc applications and thus we did not include it in the user studies. Yet, we reckon that with adaptive thresholding or more advanced techniques, it could be an interesting modality for PointerVol.

5.1.2	Multiple pointers. Since PointerVol does not require intercommunication with the display, multiple pointers can be used at the same time on the same display. The exception is to use two devices that use ultrasonic distance measurement since they would interfere with each other. It is also possible to use lasers of different colours.

  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure17.png}
  \\caption{\\label{Figure 17} Multiple pointers of diferent colours.}
  \\end{figure}                     
              
A single user can use one PointerVol on each hand for complex indications such as rotations, volumes or segments. Multiple users can have a PointerVol for example to swap quickly between the role of presenter and observer. We explored a wearable in which two lasers were attached to the thumb and index fngers (Figure 18), this allowed to perform pinching indications and rotation along 1 axis in a natural way. This wearable was created by using two laser diodes on a joystick-controlled PointerVol, thus the depth of each laser is controlled at the same time, independent control of the pointers would allow to indicate rotations along other axes.
              
  \\begin{figure}
  \\centering
  \\includegraphics[width=0.25\\linewidth]{figure18.png}
  \\caption{\\label{Figure 18} A hand with a PointerVol in the index and the thumb.}
  \\end{figure}    
                               
5.1.3 Line                    [[[[[[[[[[[[[[[ 문제10 ]]]]]]]]]]]]]]]           , 2D and 3D. Diferent patterns along the line that passes through the display volume can be projected by adjusting the signals sent to the laser over time. For example, to make a single point, or a dashed line with a point as employed in the depth user study. The length of the segments can also be adjusted, or two segments with a controlled situation to indicate lengths, animations of the pointers can also be played to convey direction along the line or speed. We also experimented by projecting 2D shapes such as circles and stars that could get extruded along the intersection line. A further option would have been to use picoprojectors to have pointers that are 3D shapes such as spheres, cubes or arrows. However, we think that this is beyond the scope of a laser pointer. For 2D screens a 0D dot is used, accordingly for a 3D volume diferent patterns along a 1D line were studied, nonetheless pointers of higher dimensionality are an interesting future line of research.              
              
5.2 limitations
Hand jittering and arm fatigue are disadvantages that PointerVol inherits from traditional laser pointers [24]. Although hand jittering is not as noticeable in our studies given that the distance between the pointer and the display ranges from 30 cm to 2 meters. For the arm fatigue, we could design pointers that can be held backwards (laser at the side of the ffth digit) or with the two hands.
Some comments from the users refect limitation on the current hardware, for example that moving the pointer quickly created a sinusoidal pattern, this could be corrected by adding inertial measurement units in the pointer and doing some corrections for fast moving pointing. Other users raised the issue of the small display volume (18x18x8 cm for the Voxon VX1), this may be solved with future larger models. A couple of users reported some specular refections of laser on the difuser in the presenter/observer scenario, but being more careful with the positioning of the users would avoid this.
The intensity of the laser is less than in a traditional pointer given that it is pulsed rather than continuous. We could have used more powerful lasers and still be within the allowed limits but we wanted to ensure safety in this preliminary studies.
PointerVol has been evaluated on a swept volumetric displays with an oscillating difuser. This type of volumetric displays is the most common one. Yet, new models seem to be shifting to rotating helical screens. PointerVol can still work on rotating helices with some limitations, it is possible to point and adjust the height, but if the pointer is tilted the height will change. Distance measuring techniques would make it work but the increased angle of refection can create issues.
Future displays based on tracer particles can work since the particle passes through a specifc 3D position in a periodic pattern, but more adjustment of the timing would be needed since the periodicity changes depending on the displayed trace. Non-linear optical volumes based on dual absorption (of IR and UV for instance) would work if an IR laser (of low power and defocused) was used, since the UV illumination plane scans the volume periodically. Two-photon absorption pointers would be dangerous given the high-power needed to trigger this phenomenon and we do not foresee how to make a PointerVol for them.
The frst exploratory user study was conducted with a presenter and an observer, but the rest of studies are single-user. In future research, we would like to perform more organic and collaborative studies with multiple users, especially analysing the presenter/observer dynamic. Also, paying more attention to the ergonomics of the pointer given that it is held on diferent ways by the users.
              
\\section{CONCLUSION}
PointerVol is a modification of a laser pointer for pointing to specific 3D positions on true-3D graphics rendered with a swept volumetric display. Two main techniques allow to adjust the depth of the pointer either with an analog joystick or by changing the distance between the pointer and the display. User studies show that it is functional and can be used for pointing and tracing. We hope that having a universal and simple pointer that works out-of-the-box with true-3D graphics could make presentations on volumetric displays more appealing and user friendly.  


  \\References{sample}

  \\end{document}`;

  // CodeMirror 초기화
  editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-stex", // LaTeX 모드
    lineNumbers: true,
    theme: "default",
    indentUnit: 2,
    smartIndent: true,
    lineWrapping: true,
    matchBrackets: true,
    styleActiveLine: true,
  });

  // 에디터에 소스 코드 설정
  editor.setValue(latexSource);

  // HTML 미리보기 초기 렌더링
  compileLatex();

  // 파일 클릭 이벤트 리스너 추가
  const fileItems = document.querySelectorAll(".file-item");
  fileItems.forEach((item) => {
    item.addEventListener("click", handleFileClick);
  });

  // 컴파일 버튼 클릭 이벤트 리스너
  document.getElementById("compile-btn").addEventListener("click", compileLatex);

  // 에디터 변경 이벤트 리스너
  editor.on("change", () => {
    // 현재 활성화된 파일이 main.tex인 경우 소스 코드 업데이트
    const activeFile = document.querySelector(".file-item.active");
    if (activeFile && activeFile.getAttribute("data-file") === "main.tex") {
      latexSource = editor.getValue();
    }
  });

  // 미리보기 섹션에 클릭 이벤트 리스너 추가 (인용 링크 및 PDF 링크용)
  document.getElementById("preview-content").addEventListener("click", handleCitationClick);
};

// LaTeX 컴파일 함수
function compileLatex() {
  addLog("컴파일 중...", "info");

  try {
    // LaTeX 코드 파싱하여 HTML로 변환
    const htmlContent = parseLatex(latexSource);
    document.getElementById("preview-content").innerHTML = htmlContent;

    // MathJax로 수식 다시 처리
    if (window.MathJax) {
      MathJax.typesetPromise([document.getElementById("preview-content")])
        .then(() => {
          addLog("컴파일 완료!", "success");
        })
        .catch((err) => {
          addLog(`수식 렌더링 오류: ${err.message}`, "error");
        });
    } else {
      addLog("컴파일 완료! (MathJax가 로드되지 않아 수식 렌더링이 불완전할 수 있습니다)", "success");
    }
  } catch (error) {
    addLog(`컴파일 오류: ${error.message}`, "error");
  }
}
