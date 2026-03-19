const bibleVerses = [
  // Wisdom and guidance
  { reference: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { reference: "Proverbs 1:7", text: "The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction." },
  { reference: "Proverbs 2:6", text: "For the LORD gives wisdom; from his mouth come knowledge and understanding." },
  { reference: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
  { reference: "Psalm 37:5", text: "Commit your way to the LORD; trust in him and he will do this." },
  { reference: "Proverbs 16:9", text: "In their hearts humans plan their course, but the LORD establishes their steps." },
  { reference: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." },

  // Overcoming temptation
  { reference: "1 Corinthians 10:13", text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear." },
  { reference: "James 1:12", text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him." },
  { reference: "James 4:7", text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you." },
  { reference: "Galatians 5:16", text: "So I say, walk by the Spirit, and you will not gratify the desires of the flesh." },
  { reference: "Matthew 26:41", text: "Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak." },
  { reference: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind." },

  // Encouragement and strength
  { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." },
  { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { reference: "Deuteronomy 31:6", text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you." },
  { reference: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
  { reference: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." },
  { reference: "Isaiah 40:31", text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },

  // Peace and trust
  { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
  { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
  { reference: "Psalm 23:1-3", text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul." },
  { reference: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { reference: "Psalm 34:4", text: "I sought the LORD, and he answered me; he delivered me from all my fears." },
  { reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." },

  // Purpose and calling
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { reference: "Ephesians 2:10", text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." },
  { reference: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." },
  { reference: "Psalm 90:12", text: "Teach us to number our days, that we may gain a heart of wisdom." },
  { reference: "Proverbs 19:21", text: "Many are the plans in a person's heart, but it is the LORD's purpose that prevails." },
  { reference: "Philippians 1:6", text: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus." },
  { reference: "Psalm 139:14", text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well." },
  { reference: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God." }
];

function getRandomVerse() {
  return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
}
