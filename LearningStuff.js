window.LEARN = {
  role: null,
  classCode: "",
  studentName: "",
  activeAssignmentId: null,
  teacherClasses: JSON.parse(localStorage.getItem("kg_teacher_classes") || "{}")
};

(function () {
  const LOCAL_PROFILE_KEY = "kg_learning_profile";
  const PRACTICE_BANK = {
    "5": [
      { topic: "Addition", prompt: "What is 248 + 179?", answer: "427" },
      { topic: "Addition", prompt: "What is 4,506 + 2,389?", answer: "6895" },
      { topic: "Addition", prompt: "What is 12,458 + 9,376?", answer: "21834" },
      { topic: "Subtraction", prompt: "What is 900 - 356?", answer: "544" },
      { topic: "Subtraction", prompt: "What is 7,000 - 2,458?", answer: "4542" },
      { topic: "Subtraction", prompt: "What is 15,000 - 4,786?", answer: "10214" },
      { topic: "Multiplication", prompt: "What is 24 x 6?", answer: "144" },
      { topic: "Multiplication", prompt: "What is 35 x 8?", answer: "280" },
      { topic: "Multiplication", prompt: "What is 46 x 12?", answer: "552" },
      { topic: "Division", prompt: "What is 84 ÷ 7?", answer: "12" },
      { topic: "Division", prompt: "What is 144 ÷ 12?", answer: "12" },
      { topic: "Division", prompt: "What is 156 ÷ 12?", answer: "13" },
      { topic: "Fractions", prompt: "What is 1/2 + 1/4?", answer: "3/4" },
      { topic: "Fractions", prompt: "What is 3/8 + 1/8?", answer: "1/2" },
      { topic: "Fractions", prompt: "What is 2/5 + 1/5?", answer: "3/5" },
      { topic: "Fractions", prompt: "What is 7/10 - 2/10?", answer: "1/2" },
      { topic: "Fractions", prompt: "What is 5/6 - 1/6?", answer: "2/3" },
      { topic: "Fractions", prompt: "What is 3/4 + 1/8?", answer: "7/8" },
      { topic: "Fractions", prompt: "What is 9/12 - 3/12?", answer: "1/2" },
      { topic: "Fractions", prompt: "What is 4/9 + 2/9?", answer: "2/3" },
      { topic: "Decimals", prompt: "What is 2.4 + 0.7?", answer: "3.1" },
      { topic: "Decimals", prompt: "What is 6.25 + 3.4?", answer: "9.65" },
      { topic: "Decimals", prompt: "What is 8.9 - 2.36?", answer: "6.54" },
      { topic: "Decimals", prompt: "What is 0.75 + 1.2?", answer: "1.95" },
      { topic: "Rounding", prompt: "Round 4,782 to the nearest hundred.", answer: "4800" },
      { topic: "Rounding", prompt: "Round 63,489 to the nearest thousand.", answer: "63000" },
      { topic: "Rounding", prompt: "Round 7.46 to the nearest tenth.", answer: "7.5" },
      { topic: "Place Value", prompt: "What digit is in the hundreds place in 8,462?", answer: "4" },
      { topic: "Place Value", prompt: "What is the value of the 7 in 472,915?", answer: "70000" },
      { topic: "Mixed Numbers", prompt: "What mixed number is 7/3?", answer: "2 1/3" },
      { topic: "Mixed Numbers", prompt: "Convert 2 1/2 to an improper fraction.", answer: "5/2" },
      { topic: "Compare Decimals", prompt: "Which is greater: 0.56 or 0.506? Type the greater number.", answer: "0.56" },
      { topic: "Compare Fractions", prompt: "Which is greater: 3/4 or 5/8? Type the greater fraction.", answer: "3/4" },
      { topic: "Equivalent Fractions", prompt: "What fraction is equal to 1/2: 2/4 or 2/5? Type the correct one.", answer: "2/4" },
      { topic: "Geometry", prompt: "How many sides does a hexagon have?", answer: "6" },
      { topic: "Geometry", prompt: "How many right angles does a rectangle have?", answer: "4" },
      { topic: "Coordinate Plane", prompt: "What is the y-coordinate of the point (3, 8)?", answer: "8" },
      { topic: "Measurement", prompt: "How many inches are in 2 feet?", answer: "24" },
      { topic: "Measurement", prompt: "How many centimeters are in 1 meter?", answer: "100" },
      { topic: "Perimeter", prompt: "What is the perimeter of a rectangle with length 9 and width 4?", answer: "26" },
      { topic: "Area", prompt: "What is the area of a rectangle with side lengths 12 and 5?", answer: "60" },
      { topic: "Volume", prompt: "What is the volume of a rectangular prism with length 4, width 3, and height 2?", answer: "24" },
      { topic: "Order of Operations", prompt: "Evaluate 6 + 3 x 4.", answer: "18" },
      { topic: "Order of Operations", prompt: "Evaluate (8 + 4) ÷ 3.", answer: "4" },
      { topic: "Word Problem", prompt: "A class has 18 boys and 17 girls. How many students are there total?", answer: "35" },
      { topic: "Word Problem", prompt: "A runner finished 3.2 miles on Monday and 2.8 miles on Tuesday. How many miles total?", answer: "6" },
      { topic: "Word Problem", prompt: "Mia used 1/4 cup of sugar and then 2/4 cup more. How much sugar did she use total?", answer: "3/4" },
      { topic: "Word Problem", prompt: "A store had 250 pencils and sold 87. How many pencils are left?", answer: "163" }
    ],
    "6": [
      { topic: "Add Integers", prompt: "Add the integers: -6 + 11", answer: "5" },
      { topic: "Add Integers", prompt: "Start at -4 on a number line and move 9 units right. Where do you land?", answer: "5" },
      { topic: "Add Integers", prompt: "Add the integers: 8 + (-13)", answer: "-5" },
      { topic: "Subtract Integers", prompt: "Subtract the integers: 7 - 12", answer: "-5" },
      { topic: "Subtract Integers", prompt: "Start at 3 on a number line and move 8 units left. Where do you land?", answer: "-5" },
      { topic: "Subtract Integers", prompt: "Subtract the integers: -2 - 6", answer: "-8" },
      { topic: "Compare Integers", prompt: "Which integer is greater: -3 or 5? Type the greater integer.", answer: "5" },
      { topic: "Compare Integers", prompt: "Compare -9 and -4. Type the greater integer.", answer: "-4" },
      { topic: "Compare Integers", prompt: "Which integer is less: 2 or -7? Type the lesser integer.", answer: "-7" },
      { topic: "Order Integers", prompt: "Put these integers in order from least to greatest: 4, -2, 0, -7. Type them like this: -7, -2, 0, 4", answer: "-7, -2, 0, 4" },
      { topic: "Order Integers", prompt: "Put these integers in order from greatest to least: -1, 6, -5, 3. Type them like this: 6, 3, -1, -5", answer: "6, 3, -1, -5" },
      { topic: "Integers On Number Lines", prompt: "Which integer is 4 units to the left of 0 on a number line?", answer: "-4" },
      { topic: "Integers On Number Lines", prompt: "Which integer is 6 units to the right of 0 on a number line?", answer: "6" },
      { topic: "Graph Integers", prompt: "A point is graphed at x = -8 on a horizontal number line. What integer is shown?", answer: "-8" },
      { topic: "Graph Integers", prompt: "A point is graphed at y = 7 on a vertical number line. What integer is shown?", answer: "7" },
      { topic: "Classify Rational Numbers", prompt: "Is -5 a rational number? Type yes or no.", answer: "yes" },
      { topic: "Classify Rational Numbers", prompt: "Is 3/4 a rational number? Type yes or no.", answer: "yes" },
      { topic: "Classify Rational Numbers", prompt: "Is 0 an integer? Type yes or no.", answer: "yes" },
      { topic: "Classify Rational Numbers", prompt: "Is 2.5 a rational number? Type yes or no.", answer: "yes" },
      { topic: "Evaluate Expressions", prompt: "Evaluate 14 - (3 + 5).", answer: "6" },
      { topic: "Evaluate Expressions", prompt: "Evaluate 18 ÷ (3 + 3).", answer: "3" },
      { topic: "Evaluate Expressions", prompt: "Evaluate 4 + [12 - (5 + 1)].", answer: "10" },
      { topic: "Evaluate Expressions", prompt: "Evaluate 2 x [3 + (4 - 1)].", answer: "12" }
    ],
    "7": [
      { topic: "Integers", prompt: "What is -8 + 13?", answer: "5" },
      { topic: "Integers", prompt: "What is -12 - 5?", answer: "-17" },
      { topic: "Equations", prompt: "Solve: 2x + 6 = 18", answer: "6" },
      { topic: "Equations", prompt: "Solve: 5x = 45", answer: "9" },
      { topic: "Proportions", prompt: "Solve: x/4 = 6/8", answer: "3" },
      { topic: "Proportions", prompt: "Solve: 3/5 = x/20", answer: "12" },
      { topic: "Geometry", prompt: "How many degrees are in a triangle?", answer: "180" },
      { topic: "Geometry", prompt: "What is the area of a circle formula? Type pi r squared.", answer: "pi r squared" },
      { topic: "Probability", prompt: "A coin is flipped once. What is the probability of heads?", answer: "1/2" },
      { topic: "Probability", prompt: "A number cube has 6 sides. What is the probability of rolling a 3?", answer: "1/6" },
      { topic: "Percent", prompt: "What is 40% of 150?", answer: "60" },
      { topic: "Slope", prompt: "Find the slope between (2,3) and (4,7).", answer: "2" },
      { topic: "Expressions", prompt: "Simplify: 4a + 3a", answer: "7a" },
      { topic: "Statistics", prompt: "What is the mean of 2, 4, 6, 8?", answer: "5" },
      { topic: "Word Problem", prompt: "A store discounts a $50 item by 20%. What is the sale price?", answer: "40" }
    ]
  };

  const state = {
    grade: "5",
    mode: "practice",
    correct: 0,
    wrong: 0,
    streak: 0,
    current: null,
    viewReady: false,
    mathAiBusy: false
  };

  function q(id) { return document.getElementById(id); }
  function esc(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function snapshotProfile() {
    return {
      role: LEARN.role,
      classCode: LEARN.classCode,
      studentName: LEARN.studentName,
      activeAssignmentId: LEARN.activeAssignmentId,
      teacherClasses: LEARN.teacherClasses,
      state: {
        grade: state.grade,
        mode: state.mode,
        correct: state.correct,
        wrong: state.wrong,
        streak: state.streak,
        current: state.current
      }
    };
  }
  function applyProfile(profile) {
    if (!profile) return;
    LEARN.role = profile.role || LEARN.role;
    LEARN.classCode = profile.classCode || LEARN.classCode;
    LEARN.studentName = profile.studentName || LEARN.studentName;
    LEARN.activeAssignmentId = profile.activeAssignmentId || null;
    LEARN.teacherClasses = profile.teacherClasses || LEARN.teacherClasses || {};
    if (profile.state) {
      state.grade = profile.state.grade || state.grade;
      state.mode = profile.state.mode || state.mode;
      state.correct = Number(profile.state.correct || 0);
      state.wrong = Number(profile.state.wrong || 0);
      state.streak = Number(profile.state.streak || 0);
      state.current = profile.state.current || null;
    }
  }
  async function saveProfile() {
    const profile = snapshotProfile();
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
    localStorage.setItem("kg_teacher_classes", JSON.stringify(LEARN.teacherClasses));
    await window._KG_PROFILE?.save?.("learning", profile);
  }
  async function loadProfile() {
    try {
      const local = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (local) applyProfile(JSON.parse(local));
    } catch {}
    try {
      const remote = await window._KG_PROFILE?.load?.("learning");
      if (remote) {
        applyProfile(remote);
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(snapshotProfile()));
        localStorage.setItem("kg_teacher_classes", JSON.stringify(LEARN.teacherClasses));
      }
    } catch {}
  }
  function saveTeacherClasses() {
    localStorage.setItem("kg_teacher_classes", JSON.stringify(LEARN.teacherClasses));
    saveProfile();
  }
  function makeCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }
  function makeAssignmentId() {
    return "asg_" + Math.random().toString(36).slice(2, 10);
  }
  function ensureClass(code) {
    if (!LEARN.teacherClasses[code]) {
      LEARN.teacherClasses[code] = { createdAt: Date.now(), students: [], assignments: [] };
    }
    if (!Array.isArray(LEARN.teacherClasses[code].students)) LEARN.teacherClasses[code].students = [];
    if (!Array.isArray(LEARN.teacherClasses[code].assignments)) LEARN.teacherClasses[code].assignments = [];
    saveTeacherClasses();
    return LEARN.teacherClasses[code];
  }
  function getClassRoom(code) {
    return LEARN.teacherClasses[code] || null;
  }
  function setStat(id, value) {
    const el = q(id);
    if (el) el.textContent = String(value);
  }
  function updateStats() {
    setStat("ms-correct", state.correct);
    setStat("ms-wrong", state.wrong);
    setStat("ms-streak", state.streak);
    setStat("ms-grade", `${state.grade}TH`);
    setStat("ms-topic", state.current ? state.current.topic.toUpperCase() : "CLASS");
  }
  function renderSkills() {
    const wrap = q("math-skills-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    (PRACTICE_BANK[state.grade] || []).forEach(item => {
      const btn = document.createElement("button");
      btn.className = "skill-chip";
      btn.textContent = item.topic.toUpperCase();
      btn.onclick = () => {
        state.current = { ...item };
        renderQuestion();
      };
      wrap.appendChild(btn);
    });
  }
  function renderClassCards(items) {
    const wrap = q("math-choices");
    wrap.innerHTML = "";
    items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "skill-chip";
      btn.textContent = item.label;
      btn.onclick = item.onclick;
      wrap.appendChild(btn);
    });
  }
  function showPractice(show) {
    q("math-practice").style.display = show ? "flex" : "none";
    q("math-ai-panel").classList.toggle("show", !show);
  }
  function setPrompt(text, feedback) {
    q("math-q-text").innerHTML = text;
    q("math-feedback").textContent = feedback || "";
  }
  function randomQuestion() {
    const bank = PRACTICE_BANK[state.grade] || PRACTICE_BANK["5"];
    return { ...bank[Math.floor(Math.random() * bank.length)] };
  }
  function getAssignment() {
    if (!LEARN.classCode || !LEARN.activeAssignmentId) return null;
    const room = getClassRoom(LEARN.classCode);
    if (!room) return null;
    return room.assignments.find(a => a.id === LEARN.activeAssignmentId) || null;
  }
  function ensureQuestionForAssignment() {
    const assignment = getAssignment();
    if (!assignment) return randomQuestion();
    const bank = (PRACTICE_BANK[assignment.grade] || PRACTICE_BANK[state.grade] || []).filter(qn => qn.topic === assignment.topic);
    if (!bank.length) return randomQuestion();
    return { ...bank[Math.floor(Math.random() * bank.length)] };
  }
  function renderQuestion() {
    if (!state.current) {
      state.current = LEARN.activeAssignmentId ? ensureQuestionForAssignment() : randomQuestion();
    }
    q("math-topic-tag").textContent = LEARN.activeAssignmentId ? "ASSIGNED SKILL" : `${LEARN.role ? LEARN.role.toUpperCase() : "STUDENT"} MODE`;
    q("math-q-text").textContent = state.current.prompt;
    q("math-choices").innerHTML = "";
    q("math-feedback").textContent = "";
    q("math-next-btn").style.display = "none";
    q("math-inp-row").style.display = "flex";
    q("math-inp").value = "";
    q("math-inp").placeholder = "Type your answer...";
    q("math-check-btn").textContent = "CHECK";
    q("math-inp").focus();
    updateStats();
    renderSkills();
  }
  function resetPracticeStats() {
    state.correct = 0;
    state.wrong = 0;
    state.streak = 0;
    state.current = null;
    saveProfile();
  }
  function renderLanding() {
    showPractice(true);
    LEARN.activeAssignmentId = null;
    q("math-topic-tag").textContent = "CLASSROOM";
    setPrompt("Choose Teacher or Student to continue.", "");
    q("math-next-btn").style.display = "none";
    q("math-inp-row").style.display = "none";
    renderClassCards([
      { label: "TEACHER", onclick: () => KG.Math.pickRole("teacher") },
      { label: "STUDENT", onclick: () => KG.Math.pickRole("student") }
    ]);
    q("math-skills-chips").innerHTML = "";
    state.current = null;
    updateStats();
  }
  function renderTeacher() {
    const code = LEARN.classCode || makeCode();
    LEARN.classCode = code;
    const room = ensureClass(code);
    const assignmentList = room.assignments.length
      ? room.assignments.map(a => `- ${a.title} (${a.grade}th, ${a.topic})`).join("\n")
      : "No assignments yet.";
    q("math-topic-tag").textContent = "TEACHER";
    setPrompt(
      `Your class code is <strong>${esc(code)}</strong>.<br><br>Students joined: <strong>${room.students.length}</strong><br><br>Assignments:<br><pre style="white-space:pre-wrap;font-family:var(--mono);color:var(--txt-mid)">${esc(assignmentList)}</pre>`,
      "Create assignments below or preview practice mode."
    );
    q("math-next-btn").style.display = "none";
    q("math-inp-row").style.display = "none";
    renderClassCards([
      { label: "COPY CLASS CODE", onclick: () => KG.Math.copyCode() },
      { label: "ADD ASSIGNMENT", onclick: () => KG.Math.showAssignmentBuilder() },
      { label: "PREVIEW PRACTICE", onclick: () => KG.Math.startPractice() },
      { label: "BACK", onclick: () => KG.Math.resetFlow() }
    ]);
    renderSkills();
    updateStats();
  }
  function renderStudentCodeEntry() {
    q("math-topic-tag").textContent = "STUDENT";
    setPrompt("Please input class code.", "");
    q("math-next-btn").style.display = "none";
    q("math-choices").innerHTML = "";
    q("math-inp-row").style.display = "flex";
    q("math-inp").value = "";
    q("math-inp").placeholder = "Enter class code";
    q("math-check-btn").textContent = "JOIN";
    q("math-skills-chips").innerHTML = "";
    q("math-inp").focus();
  }
  function renderStudentNameEntry() {
    q("math-topic-tag").textContent = "STUDENT";
    setPrompt(`Joined class <strong>${esc(LEARN.classCode)}</strong>. Enter your name to start.`, "");
    q("math-next-btn").style.display = "none";
    q("math-choices").innerHTML = "";
    q("math-inp-row").style.display = "flex";
    q("math-inp").value = "";
    q("math-inp").placeholder = "Your name";
    q("math-check-btn").textContent = "START";
    q("math-inp").focus();
  }
  function renderStudentAssignments() {
    const room = getClassRoom(LEARN.classCode);
    const assignments = room?.assignments || [];
    q("math-topic-tag").textContent = "ASSIGNMENTS";
    q("math-inp-row").style.display = "none";
    q("math-next-btn").style.display = "none";
    q("math-skills-chips").innerHTML = "";
    if (!assignments.length) {
      setPrompt(`Welcome, <strong>${esc(LEARN.studentName)}</strong>. No teacher assignments yet, but you can still practice.`, "");
      renderClassCards([
        { label: "START PRACTICE", onclick: () => KG.Math.startPractice() },
        { label: "BACK", onclick: () => KG.Math.resetFlow() }
      ]);
      return;
    }
    setPrompt(`Welcome, <strong>${esc(LEARN.studentName)}</strong>. Choose an assignment or practice on your own.`, "");
    const cards = assignments.map(a => ({
      label: `${a.title.toUpperCase()} | ${a.grade}TH | ${a.topic.toUpperCase()}`,
      onclick: () => KG.Math.startAssignment(a.id)
    }));
    cards.push({ label: "FREE PRACTICE", onclick: () => KG.Math.startPractice() });
    cards.push({ label: "BACK", onclick: () => KG.Math.resetFlow() });
    renderClassCards(cards);
  }

  KG.Math = {
    init() {
      state.viewReady = true;
      q("math-check-btn").textContent = "CHECK";
      q("math-inp").placeholder = "Type your answer...";
      loadProfile().finally(() => {
        document.querySelectorAll(".grade-btn").forEach(el => el.classList.toggle("active", el.dataset.g === state.grade));
        document.querySelectorAll(".mode-btn").forEach(el => el.classList.toggle("active", el.dataset.m === state.mode));
        showPractice(state.mode === "practice");
        KG.Math.onView();
      });
    },
    onView() {
      if (!state.viewReady) return;
      if (!LEARN.role) {
        renderLanding();
        return;
      }
      if (LEARN.role === "teacher") {
        renderTeacher();
        return;
      }
      if (LEARN.role === "student" && !LEARN.classCode) {
        renderStudentCodeEntry();
        return;
      }
      if (LEARN.role === "student" && LEARN.classCode && !LEARN.studentName) {
        renderStudentNameEntry();
        return;
      }
      if (LEARN.role === "student" && LEARN.studentName && !state.current) {
        renderStudentAssignments();
      }
    },
    setGrade(btn, grade) {
      state.grade = grade;
      document.querySelectorAll(".grade-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      updateStats();
      renderSkills();
      if (state.current) {
        state.current = null;
        renderQuestion();
      }
      saveProfile();
    },
    setMode(btn, mode) {
      state.mode = mode;
      document.querySelectorAll(".mode-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      showPractice(mode === "practice");
      if (mode === "practice") KG.Math.onView();
      saveProfile();
    },
    pickRole(role) {
      LEARN.role = role;
      LEARN.activeAssignmentId = null;
      resetPracticeStats();
      if (role === "teacher") {
        LEARN.classCode = makeCode();
        renderTeacher();
      } else {
        LEARN.classCode = "";
        LEARN.studentName = "";
        renderStudentCodeEntry();
      }
      saveProfile();
    },
    copyCode() {
      if (!LEARN.classCode) return;
      navigator.clipboard?.writeText(LEARN.classCode).catch(() => {});
      q("math-feedback").textContent = `Copied class code ${LEARN.classCode}.`;
      saveProfile();
    },
    showAssignmentBuilder() {
      const room = ensureClass(LEARN.classCode);
      const topic = (PRACTICE_BANK[state.grade] || PRACTICE_BANK["5"])[0]?.topic || "Math";
      const assignment = {
        id: makeAssignmentId(),
        title: `${state.grade}th Grade Practice ${room.assignments.length + 1}`,
        grade: state.grade,
        topic
      };
      room.assignments.push(assignment);
      saveTeacherClasses();
      renderTeacher();
      q("math-feedback").textContent = `Added assignment: ${assignment.title}.`;
      saveProfile();
    },
    startAssignment(id) {
      LEARN.activeAssignmentId = id;
      const assignment = getAssignment();
      if (assignment) state.grade = assignment.grade;
      document.querySelectorAll(".grade-btn").forEach(el => el.classList.toggle("active", el.dataset.g === state.grade));
      resetPracticeStats();
      state.current = ensureQuestionForAssignment();
      renderQuestion();
      saveProfile();
    },
    startPractice() {
      LEARN.activeAssignmentId = null;
      resetPracticeStats();
      renderQuestion();
      saveProfile();
    },
    resetFlow() {
      LEARN.role = null;
      LEARN.classCode = "";
      LEARN.studentName = "";
      LEARN.activeAssignmentId = null;
      resetPracticeStats();
      renderLanding();
      saveProfile();
    },
    checkInput() {
      const value = q("math-inp").value.trim();
      if (!LEARN.role) return renderLanding();

      if (LEARN.role === "student" && !LEARN.classCode) {
        const code = value.toUpperCase();
        if (!code) {
          q("math-feedback").textContent = "Enter a class code first.";
          return;
        }
        LEARN.classCode = code;
        ensureClass(code);
        renderStudentNameEntry();
        saveProfile();
        return;
      }

      if (LEARN.role === "student" && LEARN.classCode && !LEARN.studentName) {
        if (!value) {
          q("math-feedback").textContent = "Enter your name first.";
          return;
        }
        LEARN.studentName = value;
        const room = ensureClass(LEARN.classCode);
        if (!room.students.includes(value)) room.students.push(value);
        saveTeacherClasses();
        renderStudentAssignments();
        saveProfile();
        return;
      }

      if (!state.current) return;
      const guess = value.toLowerCase();
      const answer = String(state.current.answer).toLowerCase();
      const correct = guess === answer;
      if (correct) {
        state.correct += 1;
        state.streak += 1;
        q("math-feedback").textContent = "Correct.";
      } else {
        state.wrong += 1;
        state.streak = 0;
        q("math-feedback").textContent = `Not quite. Correct answer: ${state.current.answer}`;
      }
      updateStats();
      q("math-next-btn").style.display = "inline-flex";
      saveProfile();
    },
    next() {
      state.current = null;
      renderQuestion();
      saveProfile();
    },
    aiSend() {
      const inp = q("math-ai-inp");
      const msg = inp.value.trim();
      if (!msg || state.mathAiBusy) return;
      const msgs = q("math-ai-msgs");
      const user = document.createElement("div");
      user.className = "ai-bubble user";
      user.textContent = msg;
      msgs.appendChild(user);
      inp.value = "";
      state.mathAiBusy = true;
      q("math-ai-send").disabled = true;
      q("math-ai-loading").classList.add("show");
      const thinking = document.createElement("div");
      thinking.className = "ai-bubble thinking";
      thinking.textContent = "Math tutor is thinking...";
      msgs.appendChild(thinking);
      msgs.scrollTop = msgs.scrollHeight;
      const gradeLabel = `${state.grade}th grade`;
      const currentPrompt = state.current ? `Current practice question: ${state.current.prompt}` : "No active practice question.";
      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.OR_API_KEY || OR_API_KEY}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "Kaid Gaming Math Tutor"
        },
        body: JSON.stringify({
          model: window.OR_MODEL || OR_MODEL,
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content: "You are a math-only tutor for a school practice site. Help with arithmetic, integers, number lines, rational numbers, expressions, and related math topics only. Refuse non-math topics briefly and redirect back to math. Explain clearly, show steps when useful, and keep answers student-friendly."
            },
            {
              role: "user",
              content: `Student grade: ${gradeLabel}. ${currentPrompt} Student message: ${msg}`
            }
          ]
        })
      })
        .then(r => r.json())
        .then(data => {
          const reply = document.createElement("div");
          reply.className = "ai-bubble bot";
          reply.textContent = data?.choices?.[0]?.message?.content?.trim() || "I can help with math, but I didn't get a usable response. Try asking again with the exact problem.";
          thinking.replaceWith(reply);
        })
        .catch(() => {
          const reply = document.createElement("div");
          reply.className = "ai-bubble bot";
          reply.textContent = "I couldn't reach the math tutor right now. Try again in a moment.";
          thinking.replaceWith(reply);
        })
        .finally(() => {
          state.mathAiBusy = false;
          q("math-ai-send").disabled = false;
          q("math-ai-loading").classList.remove("show");
          msgs.scrollTop = msgs.scrollHeight;
          saveProfile();
        });
    }
  };
})();
