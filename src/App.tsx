import React, { useState, useEffect, useRef } from 'react';

interface Lesson {
  id: string;
  dayOrChapter: string;
  titleEn: string;
  titleHi: string;
  summaryEn: string;
  summaryHi: string;
  actionStep: string;
  completed: boolean;
}

interface Book {
  id: string;
  title: string;
  author: string;
  lessons: Lesson[];
}

const INITIAL_BOOKS: Book[] = [
 
      {
        "id": "stoic-practice-30",
        "title": "30-Day Stoic Practice",
        "author": "Personal Daily Habits",
        "lessons": [
          {
            "id": "sp-1",
            "dayOrChapter": "Day 1 (Jan 1)",
            "titleEn": "Control and Choice (The Two-Column Rule)",
            "titleHi": "Control aur Choice (Do-Column Niyam)",
            "summaryEn": "Trigger: Notice the exact moment you feel annoyed—such as traffic, a delayed reply, or criticism. Action: Take one deep breath and ask, 'Can I directly fix this right now?' If no, drop the complaint and shift energy to your next task.",
            "summaryHi": "Trigger: Jab traffic, late reply, ya kisi ki baat par gussa aaye. Action: Ek gehri saans lein aur poochein, 'Kya main ise abhi theek kar sakta hoon?' Agar nahi, toh shikayat chhod kar agle kaam par dhyaan dein.",
            "actionStep": "Use the Two-Column Rule whenever you feel frustrated today.",
            "completed": true
          },
          {
            "id": "sp-2",
            "dayOrChapter": "Day 2 (Jan 2)",
            "titleEn": "Education Is Freedom (Puzzle Over Threat)",
            "titleHi": "Education Is Freedom (Mushkil Ko Puzzle Samjhein)",
            "summaryEn": "Trigger: Face a situation that makes you anxious or intimidated, like a tough project or hard conversation. Action: Treat it like a puzzle rather than a threat. Ask, 'What is the worst that can happen, and what single fact do I need to handle it?'",
            "summaryHi": "Trigger: Koi mushkil project ya kathin baat-cheet jis se ghabrahat ho. Action: Ise khatra samajhne ke bajay ek puzzle samjhein aur poochein, 'Sabse bura kya ho sakta hai, aur mujhe kya seekhne ki zaroorat hai?'",
            "actionStep": "Turn one stressful problem today into a calm learning exercise.",
            "completed": false
          },
          {
            "id": "sp-3",
            "dayOrChapter": "Day 3 (Jan 3)",
            "titleEn": "Be Ruthless to What Doesn't Matter (Morning No Audit)",
            "titleHi": "Faltu Cheezon Ko Na Kahein (Subah Ka No Audit)",
            "summaryEn": "Trigger: Look at your to-do list or daily schedule each morning before checking messages. Action: Pick one non-essential thing to eliminate or say 'no' to today—such as mindless scrolling or a pointless argument.",
            "summaryHi": "Trigger: Subah messages check karne se pehle apni to-do list dekhein. Action: Aaj kisi ek गैर-ज़रूरी kaam ya distraction (jaise faltu scrolling ya bekar behas) ko 'na' kahein.",
            "actionStep": "Eliminate one non-essential task or distraction before noon.",
            "completed": false
          },
          {
            "id": "sp-4",
            "dayOrChapter": "Day 4 (Jan 4)",
            "titleEn": "The Three-Part Check (View, Effort, Acceptance)",
            "titleHi": "Teen Cheezon Ki Jaanch (Nazariya, Mehnat, Acceptance)",
            "summaryEn": "Trigger: Feel overwhelmed by multiple problems at once. Action: Separate your view of the event, your next practical action, and what you must simply accept without fighting.",
            "summaryHi": "Trigger: Jab ek saath kai pareshaniyan dimaag par haavi hon. Action: Apne nazariye, apne agle kadam, aur jo aapke control mein nahi hai uske acceptance ko alag-alag dekhein.",
            "actionStep": "Write down what you can do next and accept the rest calmly.",
            "completed": false
          },
          {
            "id": "sp-5",
            "dayOrChapter": "Day 5 (Jan 5)",
            "titleEn": "Set One Clear Target",
            "titleHi": "Ek Saaf Lakshya Tay Karein",
            "summaryEn": "Trigger: Start your workday without a clear priority. Action: Define one clear outcome you want to finish before evening so you do not drift aimlessly.",
            "summaryHi": "Trigger: Bina kisi clear plan ke din ki shuruat karna. Action: Shaam tak poora karne ke liye ek main target tay karein taaki aap bhatkein nahi.",
            "actionStep": "Write down your single top priority for today before opening your inbox.",
            "completed": false
          },
          {
            "id": "sp-6",
            "dayOrChapter": "Day 6 (Jan 6)",
            "titleEn": "The Midday Autopilot Check",
            "titleHi": "Dopahar Ka Autopilot Check",
            "summaryEn": "Trigger: Notice yourself rushing through tasks or scrolling mindlessly at lunch. Action: Pause for 30 seconds and ask: 'Where am I right now, what am I doing, and why does it matter?'",
            "summaryHi": "Trigger: Dopahar mein bina soche-samjhe kaam karna ya phone chalana. Action: 30 second ruk kar poochein: 'Main abhi kya kar raha hoon aur kya yeh sach mein zaroori hai?'",
            "actionStep": "Set a midday alarm to check if your actions match your goals.",
            "completed": false
          },
          {
            "id": "sp-7",
            "dayOrChapter": "Day 7 (Jan 7)",
            "titleEn": "Filter Your First Impression",
            "titleHi": "Pehli Soch Ko Filter Karein",
            "summaryEn": "Trigger: Hear bad news or a harsh remark and feel an immediate emotional spike. Action: Delay your judgment for ten seconds and separate the raw facts from the story your mind is inventing.",
            "summaryHi": "Trigger: Koi buri khabar ya kadwi baat sunkar turant gussa ya darr lagna. Action: 10 second rukein aur asli sach ko apne dimaag ki banayi kahani se alag karein.",
            "actionStep": "State only the objective facts before reacting to any problem today.",
            "completed": false
          },
          {
            "id": "sp-8",
            "dayOrChapter": "Day 8 (Jan 8)",
            "titleEn": "Spot Your Hidden Cravings",
            "titleHi": "Apni Chhupi Aadaton Ko Pehchanein",
            "summaryEn": "Trigger: Reach automatically for your phone, snacks, or approval from others. Action: Pause and ask whether you are choosing this freely or acting out of compulsion.",
            "summaryHi": "Trigger: Bina zaroorat baar-baar phone check karna ya doosron ki tareef dhundhna. Action: Rukein aur poochein ki kya yeh aapki choice hai ya aapki majboori ban chuki hai.",
            "actionStep": "Go two full hours today without checking social media or notifications.",
            "completed": false
          },
          {
            "id": "sp-9",
            "dayOrChapter": "Day 9 (Jan 9)",
            "titleEn": "Own Your Choices Only",
            "titleHi": "Sirf Apne Faislon Ki Zimmedari Lein",
            "summaryEn": "Trigger: Feel upset because someone else broke a promise or acted carelessly. Action: Remind yourself that their behavior belongs to them, while your integrity belongs to you.",
            "summaryHi": "Trigger: Jab koi doosra insaan apna waada tode ya laparwahi kare. Action: Khud ko yaad dilayein ki unka vyavahar unka hai, aur aapki shanti aur imaandari aapki hai.",
            "actionStep": "Respond with calm firmness instead of matching someone else's carelessness.",
            "completed": false
          },
          {
            "id": "sp-10",
            "dayOrChapter": "Day 10 (Jan 10)",
            "titleEn": "Hold Things Lightly",
            "titleHi": "Cheezon Se Zaroorat Se Zyada Lagav Na Rakhein",
            "summaryEn": "Trigger: Feel anxious about losing comfort, status, or a specific plan. Action: Enjoy what you have today while reminding yourself that everything is temporary.",
            "summaryHi": "Trigger: Kisi suvidha, status, ya plan ke bigadne ka darr lagna. Action: Aaj jo aapke paas hai uska aanand lein, lekin yaad rakhein ki har cheez asthayi hai.",
            "actionStep": "Practice gratitude for one thing you take for granted today.",
            "completed": false
          },
          {
            "id": "sp-11",
            "dayOrChapter": "Day 11 (Jan 11)",
            "titleEn": "Drop People-Pleasing",
            "titleHi": "Har Kisi Ko Khush Karne Ki Koshish Chhodein",
            "summaryEn": "Trigger: Feel tempted to say yes just to avoid awkwardness or win praise. Action: Choose honesty and self-respect over temporary approval.",
            "summaryHi": "Trigger: Sirf doosron ko khush rakhne ke liye kisi kaam ke liye haan kehna. Action: Dikhawati tareef ke bajay imaandari aur self-respect ko chunein.",
            "actionStep": "Give one polite, honest 'no' today without over-explaining.",
            "completed": false
          },
          {
            "id": "sp-12",
            "dayOrChapter": "Day 12 (Jan 12)",
            "titleEn": "The Single Rule for Calm",
            "titleHi": "Sukoon Ka Ek Seedha Niyam",
            "summaryEn": "Trigger: Catch yourself worrying about tomorrow's weather, economy, or traffic. Action: Repeat one phrase: 'If I cannot steer it, I will not carry it.'",
            "summaryHi": "Trigger: Kal ke mausam, traffic, ya bahari halat ki chinta karna. Action: Khud se kahein: 'Jise main badal nahi sakta, uska bojh main nahi uthaunga.'",
            "actionStep": "Drop one recurring worry that you have zero power to change.",
            "completed": false
          },
          {
            "id": "sp-13",
            "dayOrChapter": "Day 13 (Jan 13)",
            "titleEn": "Draw Your Boundary Circle",
            "titleHi": "Apne Control Ka Daayra Banayein",
            "summaryEn": "Trigger: Enter a noisy or chaotic environment at home or work. Action: Visualize an invisible circle around your mind—outside noise can touch the edge, but only you let it inside.",
            "summaryHi": "Trigger: Ghar ya office mein shor aur tension bhara mahaul hona. Action: Apne dimaag ke chaaron taraf ek daayra sochein—bahar ka shor andar tabhi aayega jab aap aane denge.",
            "actionStep": "Keep your voice low and steady during any noisy moment today.",
            "completed": false
          },
          {
            "id": "sp-14",
            "dayOrChapter": "Day 14 (Jan 14)",
            "titleEn": "Cut the Emotional Strings",
            "titleHi": "Gusse Aur Darr Ki Dor Kaatein",
            "summaryEn": "Trigger: Feel anger or jealousy pulling you toward an impulsive text or remark. Action: Put down your phone or step back for two minutes until the urge passes.",
            "summaryHi": "Trigger: Gusse ya jalan mein turant koi kadwa message bhejne ka mann karna. Action: Phone side mein rakhein aur 2 minute door hat jayein jab tak gussa shant na ho.",
            "actionStep": "Wait 10 minutes before replying to any frustrating message today.",
            "completed": false
          },
          {
            "id": "sp-15",
            "dayOrChapter": "Day 15 (Jan 15)",
            "titleEn": "Stay on Your Chosen Track",
            "titleHi": "Apne Chune Hue Raaste Par Tike Rahein",
            "summaryEn": "Trigger: Feel tempted to abandon a good habit because results seem slow. Action: Focus on showing up today rather than changing your plan again.",
            "summaryHi": "Trigger: Result dheere aane ki wajah se kisi achhi aadat ko beech mein chhodne ka mann karna. Action: Plan badalne ke bajay aaj ka kaam poora karne par dhyaan dein.",
            "actionStep": "Complete one small step on a long-term goal without switching tasks.",
            "completed": false
          },
          {
            "id": "sp-16",
            "dayOrChapter": "Day 16 (Jan 16)",
            "titleEn": "Break One Automatic Habit",
            "titleHi": "Ek Automatic Aadat Ko Todein",
            "summaryEn": "Trigger: Notice yourself doing something purely out of routine, like complaining or snacking late. Action: Interrupt the pattern once today with a deliberate, healthier choice.",
            "summaryHi": "Trigger: Sirf purani aadat ki wajah se shikayat karna ya der raat kuch khana. Action: Aaj is pattern ko ek baar rokein aur jaan-boojh kar sahi vikalp chunein.",
            "actionStep": "Replace one automatic complaint today with a constructive observation.",
            "completed": false
          },
          {
            "id": "sp-17",
            "dayOrChapter": "Day 17 (Jan 17)",
            "titleEn": "The Instant Reboot",
            "titleHi": "Turant Reboot Karein",
            "summaryEn": "Trigger: Realize you wasted an hour procrastinating or losing your temper. Action: Forgive the slip immediately, sit up straight, and restart your day from this exact minute.",
            "summaryHi": "Trigger: Yeh ehsaas hona ki aapne ek ghanta aalas ya gusse mein barbaad kar diya. Action: Khud ko maaf karein, seedhe baithein, aur isi pal se apna din phir shuru karein.",
            "actionStep": "Reset your focus immediately after any distraction instead of waiting for tomorrow.",
            "completed": false
          },
          {
            "id": "sp-18",
            "dayOrChapter": "Day 18 (Jan 18)",
            "titleEn": "Notice Quiet Details",
            "titleHi": "Chhoti Cheezon Mein Gehrai Dekhein",
            "summaryEn": "Trigger: Walk through your usual routine feeling bored or rushed. Action: Slow down and notice three small details around you—light, sound, or a kind gesture—with fresh eyes.",
            "summaryHi": "Trigger: Rozmarra ke kaamon mein boriyat ya jaldbazi mehsoos karna. Action: Thoda rukein aur apne aas-paas ki teen chhoti khoobsurat cheezon par gaur karein.",
            "actionStep": "Spend two minutes observing your surroundings without screens or distractions.",
            "completed": false
          },
          {
            "id": "sp-19",
            "dayOrChapter": "Day 19 (Jan 19)",
            "titleEn": "Use Obstacles as Training",
            "titleHi": "Rukawaton Ko Practice Samjhein",
            "summaryEn": "Trigger: Face a sudden delay, cancellation, or technical glitch. Action: Treat it as a live gym session for patience rather than a ruined day.",
            "summaryHi": "Trigger: Achanak koi kaam ruk jana, delay hona, ya technical problem aana. Action: Ise din kharab hona samajhne ke bajay sabr ki practice ka mauka samjhein.",
            "actionStep": "Practice patience during one unexpected delay today.",
            "completed": false
          },
          {
            "id": "sp-20",
            "dayOrChapter": "Day 20 (Jan 20)",
            "titleEn": "Speak Less, Listen More",
            "titleHi": "Kam Bolein, Zyada Sunein",
            "summaryEn": "Trigger: Enter a conversation eager to interrupt or prove your point. Action: Listen until the other person finishes completely before forming your reply.",
            "summaryHi": "Trigger: Baat-cheet mein doosre ki baat kaat kar apni baat sahi sabit karne ka mann karna. Action: Saamne wale ki baat poori hone tak dhyan se sunein.",
            "actionStep": "Let others finish speaking without interrupting in every conversation today.",
            "completed": false
          },
          {
            "id": "sp-21",
            "dayOrChapter": "Day 21 (Jan 21)",
            "titleEn": "Morning Expectation Reset",
            "titleHi": "Subah Ki Tayyari (Difficult People)",
            "summaryEn": "Trigger: Step out of bed expecting everyone to be polite and cooperative. Action: Remind yourself that you may meet impatient or rude people today, and decide in advance to stay kind and firm.",
            "summaryHi": "Trigger: Yeh ummeed rakhna ki aaj har insaan aapse achhe se pesh aayega. Action: Subah hi tay kar lein ki agar koi rude insaan mile, toh bhi aap shant aur samajhdar rahenge.",
            "actionStep": "Prepare a calm response before interacting with a difficult person today.",
            "completed": false
          },
          {
            "id": "sp-22",
            "dayOrChapter": "Day 22 (Jan 22)",
            "titleEn": "Focus on Effort, Not Applause",
            "titleHi": "Tareef Ke Bajay Mehnat Par Dhyaan Dein",
            "summaryEn": "Trigger: Feel disappointed when hard work goes unnoticed or unthanked. Action: Measure your success by the quality of your effort, not by who claps for it.",
            "summaryHi": "Trigger: Jab aapki mehnat par koi tareef ya thank you na bole. Action: Apni safalta ko apni imaandar mehnat se naapein, doosron ki taaliyon se nahi.",
            "actionStep": "Do one helpful task today without telling anyone about it.",
            "completed": false
          },
          {
            "id": "sp-23",
            "dayOrChapter": "Day 23 (Jan 23)",
            "titleEn": "Zoom Out to the Bigger Picture",
            "titleHi": "Badi Tasveer Dekhein (Zoom Out)",
            "summaryEn": "Trigger: Feel consumed by a minor mistake or daily irritation. Action: Ask yourself, 'Will this matter one year from today?' and let the small stuff shrink.",
            "summaryHi": "Trigger: Kisi chhoti galti ya roz ki chidchidahat mein ulajh jana. Action: Khud se poochein, 'Kya aaj se ek saal baad is baat ka koi matlab rahega?'",
            "actionStep": "Rate any annoyance today on a scale of 1 to 10 based on how much it matters next year.",
            "completed": false
          },
          {
            "id": "sp-24",
            "dayOrChapter": "Day 24 (Jan 24)",
            "titleEn": "Guard Your Attention",
            "titleHi": "Apne Dhyaan Ki Raksha Karein",
            "summaryEn": "Trigger: Feel pulled into outrage news, gossip, or online debates. Action: Protect your mental energy by closing the tab and returning to meaningful work.",
            "summaryHi": "Trigger: Gossip, negative news, ya online behas mein apna waqt lagana. Action: Apni mental energy bachayein, tab band karein aur apne kaam par lautein.",
            "actionStep": "Avoid reading sensational news or comment sections for 24 hours.",
            "completed": false
          },
          {
            "id": "sp-25",
            "dayOrChapter": "Day 25 (Jan 25)",
            "titleEn": "Practice Voluntary Discomfort",
            "titleHi": "Thodi Asuvidha Ko Apnayein",
            "summaryEn": "Trigger: Feel overly attached to minor comforts or conveniences. Action: Skip one small luxury today—like a sugary treat or warm shower—to prove you are resilient.",
            "summaryHi": "Trigger: Chhoti-chhoti aaram ki cheezon par zaroorat se zyada nirbhar hona. Action: Aaj kisi ek chhoti suvidha ko chhodein taaki aapko apni himmat ka ehsaas ho.",
            "actionStep": "Skip one small daily comfort today to build self-discipline.",
            "completed": false
          },
          {
            "id": "sp-26",
            "dayOrChapter": "Day 26 (Jan 26)",
            "titleEn": "Value Time Like Money",
            "titleHi": "Waqt Ko Paise Ki Tarah Samjhein",
            "summaryEn": "Trigger: Say yes to a time-wasting favor or unscheduled interruption. Action: Treat every hour as non-refundable currency and spend it intentionally.",
            "summaryHi": "Trigger: Waqt barbaad karne wale kaamon ke liye aasani se haan keh dena. Action: Har ghante ko aisa paisa samjhein jo wapas nahi milega, aur use soch-samajh kar kharch karein.",
            "actionStep": "Block 45 uninterrupted minutes today for your most important task.",
            "completed": false
          },
          {
            "id": "sp-27",
            "dayOrChapter": "Day 27 (Jan 27)",
            "titleEn": "Turn Envy into Admiration",
            "titleHi": "Jalan Ko Prerna Mein Badlein",
            "summaryEn": "Trigger: Feel a sting of jealousy seeing someone else succeed. Action: Ask what habit or discipline helped them get there and apply that lesson yourself.",
            "summaryHi": "Trigger: Kisi aur ki safalta dekh kar jalan mehsoos karna. Action: Sochein ki unki kaun si mehnat ya aadat unhe wahan le gayi, aur us seekh ko khud apnayein.",
            "actionStep": "Identify one positive habit from someone you admire and test it today.",
            "completed": false
          },
          {
            "id": "sp-28",
            "dayOrChapter": "Day 28 (Jan 28)",
            "titleEn": "Keep Your Promises to Yourself",
            "titleHi": "Khud Se Kiye Waade Nibhayein",
            "summaryEn": "Trigger: Feel tempted to skip a small personal commitment because nobody is watching. Action: Follow through anyway to build quiet self-trust.",
            "summaryHi": "Trigger: Jab koi dekh nahi raha ho toh apne hi banaye niyam todne ka mann karna. Action: Khud par bharosa badhane ke liye apna chhota waada zaroor poora karein.",
            "actionStep": "Keep one small promise to yourself today, no matter how tired you feel.",
            "completed": false
          },
          {
            "id": "sp-29",
            "dayOrChapter": "Day 29 (Jan 29)",
            "titleEn": "Accept Imperfection in Others",
            "titleHi": "Doosron Ki Kamiyon Ko Accept Karein",
            "summaryEn": "Trigger: Feel irritated by a family member or colleague's recurring quirk. Action: Remember your own flaws and choose patience over criticism.",
            "summaryHi": "Trigger: Ghar ya office mein kisi ki purani aadat par chidh hona. Action: Apni khud ki kamiyon ko yaad karein aur alochana ke bajay sabr chunein.",
            "actionStep": "Let a minor mistake by someone close to you pass without lecturing them.",
            "completed": false
          },
          {
            "id": "sp-30",
            "dayOrChapter": "Day 30 (Jan 30)",
            "titleEn": "The Evening Review",
            "titleHi": "Raat Ka Aatmanirikshan (Evening Review)",
            "summaryEn": "Trigger: Lie down in bed before checking your phone one last time. Action: Review your day in three questions: What went well? Where did I lose calm? How will I improve tomorrow?",
            "summaryHi": "Trigger: Raat ko sone se pehle aakhiri baar phone check karne ka mann karna. Action: Teen sawaalon se din ka hisaab lein: Kya achha raha? Kahan shanti khoyi? Kal kya behtar karunga?",
            "actionStep": "Spend 2 quiet minutes reviewing your day before going to sleep tonight.",
            "completed": false
          }
        ]
      }
     
];

const JOURNAL_STORAGE_KEY = 'personal_bilingual_journal';
const SEED_VERSION_STORAGE_KEY = 'personal_bilingual_journal_seed_version';
const SEED_VERSION = 'stoic-practice-30-v1';

function loadBooks(): Book[] {
  const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(SEED_VERSION_STORAGE_KEY, SEED_VERSION);
    return INITIAL_BOOKS;
  }

  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed)) {
    throw new Error('Saved reading journal must contain a list of books.');
  }

  const savedBooks = parsed as Book[];
  if (localStorage.getItem(SEED_VERSION_STORAGE_KEY) === SEED_VERSION) {
    return savedBooks;
  }

  const migratedBooks = INITIAL_BOOKS.map((initialBook) => {
    const savedBook = savedBooks.find((book) => book.id === initialBook.id);
    if (!savedBook) return initialBook;

    const savedLessonsById = new Map(
      savedBook.lessons.map((lesson) => [lesson.id, lesson])
    );
    const initialLessonIds = new Set(
      initialBook.lessons.map((lesson) => lesson.id)
    );

    return {
      ...initialBook,
      ...savedBook,
      lessons: [
        ...initialBook.lessons.map((lesson) => ({
          ...lesson,
          ...savedLessonsById.get(lesson.id),
        })),
        ...savedBook.lessons.filter(
          (lesson) => !initialLessonIds.has(lesson.id)
        ),
      ],
    };
  });
  const initialBookIds = new Set(INITIAL_BOOKS.map((book) => book.id));
  const books = [
    ...migratedBooks,
    ...savedBooks.filter((book) => !initialBookIds.has(book.id)),
  ];

  localStorage.setItem(SEED_VERSION_STORAGE_KEY, SEED_VERSION);
  return books;
}

type ViewMode = 'both' | 'en' | 'hi';

export default function App() {
  const [books, setBooks] = useState<Book[]>(loadBooks);

  const [selectedBookId, setSelectedBookId] = useState<string>(books[0]?.id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form states
  const [bookTitle, setBookTitle] = useState('The Daily Stoic');
  const [bookAuthor, setBookAuthor] = useState('Ryan Holiday');
  const [dayOrChapter, setDayOrChapter] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryHi, setSummaryHi] = useState('');
  const [actionStep, setActionStep] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const activeBook = books.find((b) => b.id === selectedBookId) || books[0];

  // Add a new personal note
  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !titleEn.trim() || !summaryEn.trim()) return;

    const newLesson: Lesson = {
      id: Date.now().toString(),
      dayOrChapter: dayOrChapter || 'Note',
      titleEn,
      titleHi: titleHi || titleEn,
      summaryEn,
      summaryHi: summaryHi || summaryEn,
      actionStep,
      completed: false,
    };

    const existingIndex = books.findIndex(
      (b) => b.title.toLowerCase() === bookTitle.trim().toLowerCase()
    );

    if (existingIndex > -1) {
      const updated = [...books];
      updated[existingIndex].lessons.push(newLesson);
      setBooks(updated);
      setSelectedBookId(updated[existingIndex].id);
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        title: bookTitle.trim(),
        author: bookAuthor.trim() || 'Personal Notes',
        lessons: [newLesson],
      };
      setBooks([...books, newBook]);
      setSelectedBookId(newBook.id);
    }

    setDayOrChapter('');
    setTitleEn('');
    setTitleHi('');
    setSummaryEn('');
    setSummaryHi('');
    setActionStep('');
    setShowAddForm(false);
  };

  // Toggle completed status
  const toggleComplete = (lessonId: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id !== activeBook?.id
          ? book
          : {
              ...book,
              lessons: book.lessons.map((l) =>
                l.id === lessonId ? { ...l, completed: !l.completed } : l
              ),
            }
      )
    );
  };

  // Delete a lesson note
  const deleteLesson = (lessonId: string) => {
    if (!window.confirm('Delete this personal note?')) return;
    setBooks((prev) =>
      prev.map((book) =>
        book.id !== activeBook?.id
          ? book
          : { ...book, lessons: book.lessons.filter((l) => l.id !== lessonId) }
      )
    );
  };

  // Export JSON backup
  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-reading-journal-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setBooks(parsed);
          if (parsed[0]) setSelectedBookId(parsed[0].id);
          alert('Notes restored successfully!');
        }
      } catch {
        alert('Invalid backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Filter lessons by search query
  const filteredLessons =
    activeBook?.lessons.filter((lesson) => {
      const q = searchQuery.toLowerCase();
      return (
        lesson.titleEn.toLowerCase().includes(q) ||
        lesson.titleHi.toLowerCase().includes(q) ||
        lesson.summaryEn.toLowerCase().includes(q) ||
        lesson.summaryHi.toLowerCase().includes(q) ||
        lesson.dayOrChapter.toLowerCase().includes(q)
      );
    }) || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">My Personal Reading Journal</h1>
            <p className="text-xs text-slate-500">Private English & Hindi / Hinglish Notes</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Language Switcher */}
            <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
              {(['both', 'en', 'hi'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md font-medium capitalize transition ${
                    viewMode === mode ? 'bg-white shadow text-indigo-600' : 'text-slate-600'
                  }`}
                >
                  {mode === 'both' ? 'Both' : mode === 'en' ? 'English' : 'Hindi / Hinglish'}
                </button>
              ))}
            </div>

            {/* Backup & Restore */}
            <button
              onClick={handleExport}
              className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg"
            >
              Export Backup
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg"
            >
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-lg"
            >
              {showAddForm ? 'Close' : '+ Add Note'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Book Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeBook?.id === book.id
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {book.title} ({book.lessons.length})
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your notes..."
            className="w-full md:w-64 border border-slate-300 bg-white rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Add Note Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddEntry}
            className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm space-y-4"
          >
            <h2 className="text-lg font-semibold text-slate-800">Add Your Personal Takeaway</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                required
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Book Title *"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="Author"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={dayOrChapter}
                onChange={(e) => setDayOrChapter(e.target.value)}
                placeholder="Chapter / Day (e.g., Day 2)"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Heading (English) *"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={titleHi}
                onChange={(e) => setTitleHi(e.target.value)}
                placeholder="Heading (Hindi / Hinglish)"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                rows={3}
                required
                value={summaryEn}
                onChange={(e) => setSummaryEn(e.target.value)}
                placeholder="Your takeaway in English *"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                rows={3}
                value={summaryHi}
                onChange={(e) => setSummaryHi(e.target.value)}
                placeholder="Aapki samajh Hindi ya Hinglish mein..."
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={actionStep}
                onChange={(e) => setActionStep(e.target.value)}
                placeholder="Personal Action Step (How will you apply this?)"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm md:col-span-3"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              Save Personal Note
            </button>
          </form>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <article
              key={lesson.id}
              className={`bg-white border rounded-xl p-6 shadow-sm transition ${
                lesson.completed
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {lesson.dayOrChapter}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleComplete(lesson.id)}
                    className="text-xs font-medium text-emerald-700 hover:text-emerald-900"
                  >
                    {lesson.completed ? 'Mark incomplete' : 'Mark complete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteLesson(lesson.id)}
                    className="text-xs text-slate-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                className={`grid gap-6 ${
                  viewMode === 'both'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {(viewMode === 'both' || viewMode === 'en') && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                      {lesson.titleEn}
                    </h2>
                    <p className="text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                      {lesson.summaryEn}
                    </p>
                  </div>
                )}
                {(viewMode === 'both' || viewMode === 'hi') && (
                  <div
                    className={
                      viewMode === 'both'
                        ? 'md:border-l md:border-slate-100 md:pl-6'
                        : ''
                    }
                  >
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                      {lesson.titleHi}
                    </h2>
                    <p className="text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                      {lesson.summaryHi}
                    </p>
                  </div>
                )}
              </div>

              {lesson.actionStep && (
                <div className="mt-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
                  <span className="font-semibold">Action Step: </span>
                  {lesson.actionStep}
                </div>
              )}
            </article>
          ))}
          {filteredLessons.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No matching notes found. Click &quot;+ Add Note&quot; to write your
              takeaway!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}