import { db } from '@/db';
import { blogPosts } from '@/db/schema';

async function main() {
    const sampleBlogPosts = [
        {
            title: '5 Proven Ways to Control Pet Odors in Your Apartment',
            slug: '5-proven-ways-to-control-pet-odors-in-your-apartment',
            excerpt: 'Living with pets in an apartment doesn\'t mean you have to compromise on fresh air. Discover five effective strategies to eliminate pet odors and maintain a clean-smelling home.',
            content: `Living in an apartment with pets brings immense joy, but managing odors can be challenging in smaller spaces. The key to maintaining a fresh-smelling home lies in understanding the sources of pet odors and implementing proactive solutions.

First and foremost, regular cleaning is essential. Vacuum your carpets and furniture at least twice a week using a vacuum with a HEPA filter designed for pet hair. Wash your pet's bedding weekly in hot water with an enzymatic cleaner that breaks down odor-causing bacteria. Don't forget to clean your pet's toys and accessories regularly as they can harbor odors.

Air purification makes a significant difference in apartment living. Invest in a quality air purifier with activated carbon filters specifically designed for pet odors. Place it in the room where your pet spends most time, and run it continuously. Additionally, open windows daily for at least 15 minutes to promote air circulation, even during colder months.

Litter box management is crucial for cat owners. Scoop the litter box at least twice daily and completely change the litter weekly. Place the box in a well-ventilated area and consider using a hooded litter box with carbon filters. For dogs, establish a regular bathroom schedule and clean any accidents immediately with enzymatic cleaners rather than ammonia-based products.

Finally, maintain your pet's hygiene through regular grooming. Brush your pet daily to reduce shedding and dander, and bathe them according to your veterinarian's recommendations. Don't forget dental care – many pet odors originate from poor oral hygiene. With these strategies consistently applied, your apartment can remain fresh and welcoming for both you and your guests.`,
            featuredImage: '/images/blog/post-1.jpg',
            category: 'apartment-tips',
            tags: 'odor control,cleaning,apartment living',
            seoTitle: 'How to Control Pet Odors in Apartments: 5 Proven Methods',
            seoDescription: 'Eliminate pet odors in your apartment with these 5 proven strategies. Learn effective cleaning, air purification, and hygiene tips for fresh-smelling spaces.',
            published: true,
            publishedAt: new Date('2024-11-15').toISOString(),
            createdAt: new Date('2024-11-10').toISOString(),
            updatedAt: new Date('2024-11-15').toISOString(),
        },
        {
            title: 'Indoor Exercise Ideas for Active Dogs in Small Spaces',
            slug: 'indoor-exercise-ideas-for-active-dogs-in-small-spaces',
            excerpt: 'Keep your energetic dog happy and healthy even in limited space. These creative indoor exercises will tire out your pup while protecting your apartment.',
            content: `Active dogs need regular exercise regardless of your living situation, and apartment living shouldn't limit your dog's physical activity. With creativity and consistency, you can provide excellent exercise opportunities within your home's four walls.

Interactive games offer excellent physical and mental stimulation. Hide-and-seek is perfect for apartments – have your dog stay in one room while you hide treats or toys throughout your space. Start with easy hiding spots and gradually increase difficulty. Tug-of-war provides intense bursts of activity and strengthens your bond. Use a rope toy and play in your longest hallway or living room, teaching proper "drop it" commands to maintain control.

Stairway exercises are incredibly effective if you have access to stairs. Throw a ball or toy up the stairs and let your dog retrieve it multiple times. Start with 5-10 repetitions and gradually increase. For variation, practice "puppy push-ups" – alternating between sit and down commands rapidly. This engages both body and mind while burning energy efficiently.

Create an indoor agility course using household items. Set up chairs for weaving, pillows for jumping, and blankets for tunneling. Change the configuration regularly to keep it challenging and interesting. Combine this with training sessions where you practice commands like "around," "over," and "through" to add mental stimulation to physical exercise.

Remember that mental exercise tires dogs as effectively as physical activity. Use puzzle toys, snuffle mats, and training sessions to engage your dog's mind. A 15-minute intense training session can be as tiring as a 30-minute walk. Balance these activities throughout the day, and your apartment dog will be happy, healthy, and well-behaved.`,
            featuredImage: '/images/blog/post-2.jpg',
            category: 'training',
            tags: 'exercise,indoor activities,dogs',
            seoTitle: 'Indoor Dog Exercise: Best Activities for Small Apartments',
            seoDescription: 'Discover creative indoor exercise ideas for active dogs in apartments. Keep your dog fit and happy with these space-efficient activities.',
            published: true,
            publishedAt: new Date('2024-11-22').toISOString(),
            createdAt: new Date('2024-11-20').toISOString(),
            updatedAt: new Date('2024-11-22').toISOString(),
        },
        {
            title: 'Creating a Pet-Friendly Apartment Setup on a Budget',
            slug: 'creating-a-pet-friendly-apartment-setup-on-a-budget',
            excerpt: 'Transform your apartment into a pet paradise without breaking the bank. Learn practical, affordable solutions for creating a comfortable space for your furry friend.',
            content: `Creating a pet-friendly apartment doesn't require expensive renovations or designer pet furniture. With smart shopping and DIY creativity, you can design a space that meets your pet's needs while respecting your budget and lease agreement.

Start with strategic furniture placement and protection. Use washable slipcovers on sofas and chairs instead of buying new pet-proof furniture. Place inexpensive throw blankets on your pet's favorite spots for easy cleaning. Position furniture to create cozy nooks where your pet can retreat – cats love elevated spaces, so consider rearranging bookshelves to create safe perches.

DIY solutions offer significant savings while providing customized pet amenities. Build a simple cat tree using carpet remnants and PVC pipes for under twenty dollars. Create a dog feeding station using a shower caddy turned upside down to elevate bowls, preventing neck strain. Use command strips to mount wall shelves for cat walkways, allowing vertical exploration without damaging walls.

Shop smart for essential items by checking thrift stores, garage sales, and online marketplaces for gently used pet supplies. Buy generic brands for items like puppy pads, litter, and basic toys – the quality is often identical to premium brands. Join pet owner groups on social media where members frequently share deals and swap supplies their pets have outgrown.

Invest wisely in key areas that impact your pet's health and your deposit. Purchase a quality enzymatic cleaner for accidents – it's cheaper than losing your security deposit. Use washable puppy pads or reusable potty patches instead of disposables. Create enrichment toys using cardboard boxes, paper bags, and old t-shirts. Your pet cares more about engagement and comfort than expensive accessories, and your wallet will thank you.`,
            featuredImage: '/images/blog/post-3.jpg',
            category: 'lifestyle',
            tags: 'apartment setup,budget tips,pet-friendly',
            seoTitle: 'Budget Pet-Friendly Apartment Setup: Affordable Tips & DIY Ideas',
            seoDescription: 'Set up a pet-friendly apartment on a budget with these practical tips. Save money while creating a comfortable space for your pet.',
            published: true,
            publishedAt: new Date('2024-12-01').toISOString(),
            createdAt: new Date('2024-11-28').toISOString(),
            updatedAt: new Date('2024-12-01').toISOString(),
        },
        {
            title: 'Best Grooming Routines for Apartment-Dwelling Cats',
            slug: 'best-grooming-routines-for-apartment-dwelling-cats',
            excerpt: 'Maintain your indoor cat\'s health and cleanliness with proper grooming. These apartment-friendly routines keep your feline looking great and your space hair-free.',
            content: `Indoor cats living in apartments have unique grooming needs that differ from their outdoor counterparts. A consistent grooming routine not only keeps your cat healthy and comfortable but also minimizes shedding and dander throughout your living space.

Daily brushing is the foundation of apartment cat care. Dedicate 5-10 minutes each day to brushing your cat, preferably at the same time to establish routine. For short-haired cats, use a rubber brush or grooming glove to remove loose fur. Long-haired breeds require a slicker brush followed by a metal comb to prevent mats. Brush near a window or on a designated towel to contain loose hair, making cleanup easier. This daily ritual reduces hairballs, controls shedding, and strengthens your bond.

Nail trimming is essential for apartment cats who don't naturally wear down their claws outdoors. Trim nails every 2-3 weeks to prevent furniture damage and accidental scratches. Invest in quality cat nail clippers and learn to identify the quick – the pink area containing blood vessels. Start slowly, perhaps doing one paw per session if your cat resists. Pair nail trims with treats to create positive associations.

Dental hygiene often gets overlooked but is crucial for indoor cats. Brush your cat's teeth 2-3 times weekly using pet-specific toothpaste and a finger brush or small toothbrush. Start by letting your cat lick the toothpaste, then gradually introduce brushing. Focus on the outer surfaces where plaque accumulates most. Supplement with dental treats and toys designed to reduce tartar buildup.

Occasional baths may be necessary for long-haired cats or those who get into messes. Most cats need bathing only a few times yearly unless prescribed by a veterinarian. Use a cat-specific shampoo, warm water, and work in your bathroom with the door closed. Keep sessions short and calm, and always reward your cat afterward. Between baths, use grooming wipes to spot-clean and maintain freshness in your apartment environment.`,
            featuredImage: '/images/blog/post-4.jpg',
            category: 'grooming',
            tags: 'cats,grooming,apartment tips',
            seoTitle: 'Complete Cat Grooming Guide for Apartment Living',
            seoDescription: 'Learn essential grooming routines for indoor apartment cats. Keep your feline healthy, clean, and your home fur-free with expert tips.',
            published: true,
            publishedAt: new Date('2024-12-05').toISOString(),
            createdAt: new Date('2024-12-03').toISOString(),
            updatedAt: new Date('2024-12-05').toISOString(),
        },
        {
            title: 'Managing Pet Noise: A Guide for Apartment Dwellers',
            slug: 'managing-pet-noise-a-guide-for-apartment-dwellers',
            excerpt: 'Keep the peace with your neighbors while enjoying life with your pet. Learn effective strategies to minimize pet noise in apartment settings.',
            content: `Living in an apartment with pets requires consideration for neighbors who share walls, floors, and ceilings. Managing pet noise isn't just about maintaining good relationships – it's essential for staying in compliance with lease agreements and creating a peaceful environment for everyone.

Understanding the root causes of pet noise is the first step toward solutions. Dogs bark due to anxiety, boredom, territorial behavior, or alert responses. Cats vocalize when stressed, seeking attention, or during mating behaviors if not spayed or neutered. Identify patterns in your pet's noisy behavior by keeping a log of when and why noise occurs. This information helps you address underlying issues rather than just symptoms.

Training forms the foundation of noise management. For dogs, teach the "quiet" command by rewarding silence after barking. Never yell at a barking dog – it only adds to the noise. Instead, redirect their attention to a toy or command they know well. Practice this during calm periods before applying it during actual barking episodes. For separation anxiety, gradually desensitize your dog to your departures through short practice sessions that slowly increase in duration.

Environmental modifications significantly reduce noise transmission. Place rubber mats under pet bowls to muffle feeding sounds. Use carpet runners in hallways where your dog walks frequently. Install door sweeps to minimize sound traveling to hallways. Add acoustic panels or thick curtains to walls shared with neighbors. Consider white noise machines to mask pet sounds and help your pet remain calm when they hear outside noises that might trigger reactions.

Maintain open communication with neighbors about your pet. Inform them you're working on noise issues and ask them to alert you to problems, as you may not hear everything from inside your unit. Leave your contact information and schedule training sessions during times when they're typically away. Many noise complaints arise from lack of communication rather than the noise itself. Proactive transparency demonstrates responsibility and often results in more understanding neighbors who appreciate your efforts.`,
            featuredImage: '/images/blog/post-5.jpg',
            category: 'apartment-tips',
            tags: 'noise management,neighbors,training',
            seoTitle: 'How to Manage Pet Noise in Apartments: Neighbor-Friendly Solutions',
            seoDescription: 'Reduce pet noise in apartments with proven training and soundproofing tips. Maintain good neighbor relations while enjoying life with your pet.',
            published: true,
            publishedAt: new Date('2024-11-28').toISOString(),
            createdAt: new Date('2024-11-25').toISOString(),
            updatedAt: new Date('2024-11-28').toISOString(),
        },
        {
            title: 'Small Space Solutions: Feeding Stations That Work',
            slug: 'small-space-solutions-feeding-stations-that-work',
            excerpt: 'Optimize your apartment layout with smart feeding station designs. Create functional, clean eating areas for your pets without sacrificing precious space.',
            content: `In compact apartments, every square foot matters, yet your pet needs a dedicated, functional feeding area. The right feeding station setup maximizes space efficiency while promoting healthy eating habits and maintaining cleanliness throughout your home.

Location selection is crucial in small apartments. Choose a low-traffic area away from litter boxes but easily accessible for refills and cleaning. Kitchen corners work well but avoid placing bowls directly in walkways. For cats, elevated locations away from dog access prevent food stealing and reduce stress. Consider the "work triangle" concept – position the feeding station where you naturally flow between food storage, water source, and waste disposal.

Elevated feeding stations offer multiple benefits in tight spaces. Raised bowls aid digestion and reduce neck strain, particularly important for larger dogs. Use furniture risers, overturned planters, or purpose-built elevated feeders that often include storage for food and supplies underneath. This vertical approach minimizes floor clutter while creating a more ergonomic feeding position. Wall-mounted options work excellently for cats, freeing floor space entirely.

Organization systems prevent feeding areas from becoming chaotic. Store food in airtight containers that stack efficiently in nearby cabinets. Use a shower caddy or small cart to hold bowls, making it easy to move during cleaning. Designate a specific drawer or shelf for pet feeding supplies, treats, and medications. Place a washable mat under feeding bowls to catch spills and protect flooring – choose one that's slightly larger than the feeding area but not so large it becomes a trip hazard.

Maintain cleanliness with strategic habits that prevent odors and mess. Wash food bowls daily in hot soapy water. Sweep or vacuum the feeding area after each meal to prevent crumbs from attracting pests. For messy eaters, use splash-proof bowls or place regular bowls inside slightly larger, shallow trays. Store food containers away from humidity and heat sources to maintain freshness. A clean, well-organized feeding station takes minimal space while significantly improving your apartment's functionality and appearance.`,
            featuredImage: '/images/blog/post-6.jpg',
            category: 'care',
            tags: 'feeding,organization,small spaces',
            seoTitle: 'Smart Feeding Stations for Small Apartments: Space-Saving Pet Solutions',
            seoDescription: 'Create efficient pet feeding stations in small spaces. Discover organization tips and space-saving designs for apartment living with pets.',
            published: true,
            publishedAt: new Date('2024-12-08').toISOString(),
            createdAt: new Date('2024-12-06').toISOString(),
            updatedAt: new Date('2024-12-08').toISOString(),
        },
        {
            title: 'Essential Health Checks for Indoor Pets',
            slug: 'essential-health-checks-for-indoor-pets',
            excerpt: 'Indoor pets face unique health challenges. Learn what to monitor at home and when to consult your veterinarian to keep your apartment pet thriving.',
            content: `Indoor apartment pets live in controlled environments that eliminate many outdoor hazards but present their own health considerations. Regular monitoring and preventive care ensure your pet stays healthy and catches potential issues before they become serious problems.

Weight management is critical for indoor pets who typically exercise less than outdoor animals. Weigh your pet monthly using a bathroom scale – step on with and without your pet, then calculate the difference. Track weight trends rather than focusing on single measurements. Indoor cats and dogs are prone to obesity, which leads to diabetes, joint problems, and reduced lifespan. If your pet gains more than 10% of their ideal weight, consult your veterinarian about diet adjustments before it becomes a larger issue.

Dental health deteriorates rapidly in indoor pets without regular monitoring. Check your pet's teeth weekly for signs of tartar buildup, red or bleeding gums, or loose teeth. Healthy gums appear pink, not red or white. Notice bad breath, as this often indicates dental disease. Indoor pets need more active dental care since they don't naturally clean teeth through outdoor activities like chewing on sticks. Schedule professional cleanings as recommended by your vet, typically annually for most pets.

Behavioral changes often signal health problems before physical symptoms appear. Monitor your pet's eating, drinking, and bathroom habits daily. Sudden increases or decreases in these activities warrant veterinary attention. Watch for changes in energy levels, sleep patterns, or social interaction. Indoor pets show subtle signs of illness more clearly since you observe them constantly. Document concerning behaviors with dates and descriptions to provide detailed information during vet visits.

Preventive care remains essential even for indoor pets. Maintain regular vaccination schedules as recommended by your veterinarian – indoor pets still need core vaccines. Continue flea and tick prevention year-round; these pests easily enter apartments through doorways and on clothing. Schedule annual wellness exams for young adult pets and semi-annual visits for seniors over seven years old. Blood work catches kidney disease, diabetes, and thyroid problems before symptoms appear. Prevention costs far less than treating advanced illness and keeps your indoor companion comfortable and healthy throughout their life.`,
            featuredImage: '/images/blog/post-7.jpg',
            category: 'health',
            tags: 'health,indoor pets,vet care',
            seoTitle: 'Indoor Pet Health Monitoring: Essential Checks for Apartment Pets',
            seoDescription: 'Learn crucial health monitoring for indoor apartment pets. Recognize warning signs and maintain preventive care for healthy, happy pets.',
            published: true,
            publishedAt: new Date('2024-11-18').toISOString(),
            createdAt: new Date('2024-11-15').toISOString(),
            updatedAt: new Date('2024-11-18').toISOString(),
        },
        {
            title: 'Training Your Dog in a Studio Apartment',
            slug: 'training-your-dog-in-a-studio-apartment',
            excerpt: 'Limited space doesn\'t limit training potential. Master essential commands and behaviors in your studio apartment with these proven techniques.',
            content: `Training a dog in a studio apartment presents unique challenges but offers surprising advantages. The confined space forces consistency and creates a focused training environment where your dog learns faster with fewer distractions than outdoor settings provide.

Establish clear boundaries and designated spaces immediately. Dogs thrive on structure, especially important in studio layouts where eating, sleeping, and living areas overlap. Use furniture placement to define zones – a rug indicates the relaxation area, a mat marks the feeding station, and a bed designates sleeping quarters. Train your dog to respect these boundaries through positive reinforcement. When your dog settles on their designated bed, reward them consistently. This spatial awareness prevents behavioral problems and helps your dog feel secure in limited space.

Focus on essential commands that make studio living harmonious. "Settle" and "place" commands are invaluable – teach your dog to go to their bed and remain calm on cue. Practice "quiet" to manage barking in close quarters. Master loose-leash walking before leaving your apartment to prevent pulling in tight hallways. Train "wait" at doorways to prevent bolting and create safe entry and exit habits. These commands aren't just about obedience; they're practical tools that make sharing small space enjoyable for both of you.

Maximize your limited square footage through creative training setups. Use your hallway for recall practice, building distance gradually. Practice stays and down-stays while you move around your studio performing normal activities. This teaches your dog to remain calm regardless of your location. Incorporate training into daily routines – ask for a sit before meals, a down before opening doors, or tricks before playtime. Short, frequent training sessions integrated into daily life are more effective than long, dedicated sessions in small spaces.

Mental stimulation through training exercises tires dogs as effectively as physical exercise. Teach new tricks regularly to keep your dog's mind engaged. Practice scent work by hiding treats around your studio for your dog to find. Work on impulse control games like "it's your choice" where your dog learns to wait patiently for rewards. Use puzzle toys and feeding games to make meals mentally challenging. A tired mind leads to a calm dog, essential for peaceful studio apartment living. Consistency, patience, and creativity transform your studio into an excellent training environment where your dog can thrive.`,
            featuredImage: '/images/blog/post-8.jpg',
            category: 'training',
            tags: 'training,studio,dogs,small space',
            seoTitle: 'Studio Apartment Dog Training: Complete Guide for Small Spaces',
            seoDescription: 'Train your dog effectively in a studio apartment with space-efficient techniques. Master essential commands for harmonious small-space living.',
            published: true,
            publishedAt: new Date('2024-12-10').toISOString(),
            createdAt: new Date('2024-12-08').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString(),
        },
        {
            title: 'Cat Enrichment Ideas for 1BHK Apartments',
            slug: 'cat-enrichment-ideas-for-1bhk-apartments',
            excerpt: 'Transform your 1BHK into a feline paradise with creative enrichment solutions. Keep your indoor cat mentally stimulated and physically active in limited space.',
            content: `A 1BHK apartment may seem restrictive for a cat, but with thoughtful enrichment strategies, you can create an engaging environment that satisfies your cat's natural instincts while respecting space limitations. Indoor cats need mental and physical stimulation to remain healthy, happy, and well-behaved.

Vertical space is your greatest asset in a 1BHK. Cats naturally seek elevated positions for security and territory observation. Install wall-mounted shelves at varying heights to create climbing pathways. Place shelves near windows for prime bird-watching spots. Use the vertical space above doorways by installing perches or shelves that cats can access via nearby furniture. A floor-to-ceiling cat tree in a corner provides multiple levels without consuming valuable floor space. This vertical territory expansion effectively triples your cat's usable living area.

Window enrichment provides endless entertainment for indoor cats. Install bird feeders outside your window to create "cat TV" – the movement and activity stimulate your cat's hunting instincts safely. Use suction-cup perches on windows to give your cat front-row seats. Open windows slightly (with secure screens) to allow fresh air and outdoor sounds, adding sensory variety to your cat's day. Rotate which windows have access to keep the environment novel and interesting.

Interactive play sessions are crucial for 1BHK cats. Dedicate 15-20 minutes twice daily to active play using wand toys that mimic prey movement. Vary your play locations – use the bedroom one session, living area the next. Create hunting scenarios where your cat chases toys around furniture corners and under chairs. End play sessions by letting your cat "catch" the prey, followed by a small meal, mimicking natural hunt-eat-sleep cycles that satisfy instinctual needs.

Environmental rotation prevents boredom in limited spaces. Don't leave all toys available constantly – rotate toy selection weekly to maintain novelty. Rearrange furniture slightly every few months to create new exploration opportunities. Use cardboard boxes to temporarily create tunnels or hiding spots, changing configurations regularly. Hide treats or kibble around your apartment for your cat to hunt. Introduce new scents periodically using cat-safe herbs like silvervine or catnip. These simple rotations make your 1BHK feel like an ever-changing environment, keeping your cat engaged and content without requiring additional space or expensive purchases.`,
            featuredImage: '/images/blog/post-9.jpg',
            category: 'lifestyle',
            tags: 'cats,enrichment,indoor activities',
            seoTitle: '1BHK Cat Enrichment: Creative Ideas for Indoor Felines',
            seoDescription: 'Enrich your indoor cat\'s life in a 1BHK apartment with these creative, space-efficient ideas. Keep your feline happy and stimulated.',
            published: true,
            publishedAt: new Date('2024-12-03').toISOString(),
            createdAt: new Date('2024-12-01').toISOString(),
            updatedAt: new Date('2024-12-03').toISOString(),
        },
        {
            title: 'Complete Daily Exercise Routine for Apartment Dogs',
            slug: 'complete-daily-exercise-routine-for-apartment-dogs',
            excerpt: 'Build a sustainable daily exercise routine that keeps your apartment dog healthy and happy. Balance indoor and outdoor activities for optimal fitness.',
            content: `Creating a consistent daily exercise routine is essential for apartment dogs who lack the space for spontaneous activity. A well-structured schedule prevents behavioral problems, maintains healthy weight, and ensures your dog remains happy despite limited living space.

Morning energy burn sets the tone for a calm day. Start with a 20-30 minute walk before breakfast, allowing your dog to eliminate and expel pent-up overnight energy. Vary your route daily to provide mental stimulation through new scents and sights. Practice loose-leash walking and basic commands during this walk, combining physical exercise with mental engagement. Upon returning home, have your dog work for breakfast through training exercises or puzzle feeders, extending the mental workout and preventing post-walk hyperactivity.

Midday sessions maintain energy balance, especially important for high-energy breeds or young dogs. If you're home during lunch, schedule a 10-15 minute play session with interactive toys like tug ropes or fetch in a hallway. For working owners, consider a dog walker or use this time for mental exercises like puzzle toys filled with lunch portions. Indoor dogs benefit from multiple shorter activity sessions rather than one long session, preventing the extreme energy fluctuations that lead to destructive behavior.

Evening exercise provides crucial physical activity and prepares your dog for calm overnight behavior. Schedule a longer 30-45 minute walk or visit to a dog park if available. Include socialization opportunities when safe and appropriate for your dog's temperament. This extended activity should be more rigorous than morning walks – incorporate jogging intervals, fetch, or hill walking if your area allows. Follow with a calm cooldown period and dinner, helping your dog transition into relaxation mode.

Supplement walks with targeted indoor exercises throughout the day. Practice stair climbing for 5 minutes (if knees are healthy), complete three sets of sit-stands, or play hide-and-seek with toys. Use commercial breaks or work-from-home pauses for quick training sessions. Before bedtime, engage in calm, focused activities like brushing, gentle massage, or quiet training to help your dog settle. This comprehensive daily routine, adapted to your dog's age, breed, and energy level, ensures your apartment dog receives adequate exercise while building the structure that creates a peaceful, harmonious living environment for both of you.`,
            featuredImage: '/images/blog/post-10.jpg',
            category: 'care',
            tags: 'exercise,routine,dogs,apartment',
            seoTitle: 'Daily Dog Exercise Routine for Apartments: Complete Schedule',
            seoDescription: 'Create an effective daily exercise routine for your apartment dog. Balance indoor and outdoor activities for a healthy, happy pet.',
            published: true,
            publishedAt: new Date('2024-12-12').toISOString(),
            createdAt: new Date('2024-12-10').toISOString(),
            updatedAt: new Date('2024-12-12').toISOString(),
        },
    ];

    await db.insert(blogPosts).values(sampleBlogPosts);
    
    console.log('✅ Blog posts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});