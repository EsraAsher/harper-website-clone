import { db } from '@/db';
import { routines } from '@/db/schema';

async function main() {
    const sampleRoutines = [
        {
            petType: 'dog',
            apartmentSize: 'studio',
            morningRoutine: '6:30 AM - Wake up and immediate potty break on pee pad\n7:00 AM - Breakfast (3/4 cup dry food + 1/4 cup wet food)\n7:30 AM - 15-minute walk around the block\n8:00 AM - Mental stimulation game (hide treats in small space)\n8:30 AM - Calm settle time on designated bed area',
            afternoonRoutine: '12:00 PM - Quick potty break\n12:30 PM - Light snack (training treats during command practice)\n2:00 PM - Indoor play session with soft toys (10 minutes)\n3:00 PM - Rest period with background music',
            eveningRoutine: '5:30 PM - 20-minute evening walk\n6:30 PM - Dinner (3/4 cup dry food + 1/4 cup wet food)\n7:30 PM - Interactive play with puzzle toys\n8:30 PM - Final potty break\n9:00 PM - Wind-down routine with gentle petting\n9:30 PM - Bedtime in crate or designated sleeping area',
            exerciseTips: '- Take 3 short walks daily (15-20 minutes each)\n- Use vertical space: teach "up" command on furniture\n- Practice indoor obedience training for mental exercise\n- Visit dog park 3-4 times per week for socialization\n- Rotate toys weekly to maintain interest in small space\n- Use hallway for short fetch sessions with soft balls',
            feedingSchedule: 'Breakfast: 7:00 AM - 1 cup total (3/4 dry + 1/4 wet)\nLunch snack: 12:30 PM - Small handful of training treats\nDinner: 6:30 PM - 1 cup total (3/4 dry + 1/4 wet)\nEvening treat: 8:00 PM - 1 dental chew\n\nWater: Available 24/7, refresh 3x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'dog',
            apartmentSize: '1bhk',
            morningRoutine: '6:30 AM - Wake up and potty break outside or on balcony\n7:00 AM - Breakfast (1 cup dry food mixed with vegetables)\n7:30 AM - 25-minute neighborhood walk with sniff time\n8:15 AM - Training session in living room (15 minutes)\n8:45 AM - Free play time between rooms\n9:00 AM - Settle in favorite spot',
            afternoonRoutine: '12:30 PM - Midday potty break and quick 10-minute walk\n1:00 PM - Light lunch treat (1/4 cup kibble or training treats)\n2:00 PM - Indoor fetch in hallway (10 minutes)\n3:00 PM - Quiet time with chew toy in bedroom',
            eveningRoutine: '5:00 PM - 30-minute walk or dog park visit\n6:00 PM - Dinner (1 cup dry food with protein topper)\n7:00 PM - Training and trick practice\n7:30 PM - Play session with interactive toys\n8:30 PM - Final evening walk (15 minutes)\n9:00 PM - Calm activities: gentle play or massage\n10:00 PM - Bedtime routine',
            exerciseTips: '- Morning walk 25-30 minutes, evening walk 30-35 minutes\n- Use living room for indoor agility with cushions\n- Set up play zones in different rooms for variety\n- Practice recall between bedroom and living room\n- Join group training classes for socialization\n- Utilize balcony space for sniff exploration\n- Schedule 2-3 dog park visits weekly',
            feedingSchedule: 'Breakfast: 7:00 AM - 1.5 cups total (dry food + veggies)\nLunch treat: 1:00 PM - 1/4 cup kibble or training treats\nDinner: 6:00 PM - 1.5 cups total (dry food + protein topper)\nEvening snack: 8:00 PM - 1 bully stick or dental chew\n\nWater: Fresh bowls in living room and bedroom, refill 4x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'dog',
            apartmentSize: '2bhk',
            morningRoutine: '6:30 AM - Wake up and outside potty break\n7:00 AM - Breakfast (1.5 cups dry food + fresh protein)\n7:45 AM - 30-minute morning walk with training opportunities\n8:30 AM - Interactive play across multiple rooms\n9:00 AM - Mental enrichment (puzzle feeders, scent work)\n9:30 AM - Rest time in favorite room',
            afternoonRoutine: '12:00 PM - Midday walk (20 minutes)\n1:00 PM - Lunch snack (Kong stuffed with treats)\n2:00 PM - Indoor games: hide and seek between rooms\n3:00 PM - Training session using different rooms\n4:00 PM - Quiet rest period',
            eveningRoutine: '5:00 PM - 40-minute walk or outdoor play session\n6:00 PM - Dinner (1.5 cups with supplements)\n7:00 PM - Family interaction and training\n7:45 PM - Active play: tug, fetch in hallway\n8:30 PM - Wind-down activities across apartment\n9:00 PM - Final evening walk (20 minutes)\n9:30 PM - Grooming and massage\n10:00 PM - Bedtime in designated sleeping area',
            exerciseTips: '- Morning walks 30-40 minutes with varied routes\n- Evening walks 40-50 minutes including jogging intervals\n- Create obstacle courses using furniture in different rooms\n- Practice distance commands across rooms\n- Set up play stations in each room\n- Use spare bedroom for dedicated training space\n- Schedule daily off-leash dog park time (45 minutes)\n- Rotate activities between rooms to prevent boredom',
            feedingSchedule: 'Breakfast: 7:00 AM - 2 cups (dry food + fresh protein/eggs)\nMidday snack: 1:00 PM - Stuffed Kong or puzzle feeder\nDinner: 6:00 PM - 2 cups (dry food + supplements + vegetables)\nEvening treat: 8:30 PM - Long-lasting chew\n\nWater: Multiple stations (living room, bedroom, spare room), refresh 5x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'dog',
            apartmentSize: '3bhk',
            morningRoutine: '6:30 AM - Wake up and immediate outdoor potty break\n7:00 AM - Breakfast (2 cups premium food with fresh additions)\n7:45 AM - 45-minute morning walk with socialization\n8:45 AM - Free exploration of entire apartment\n9:15 AM - Training session in dedicated space\n9:45 AM - Mental enrichment activities\n10:15 AM - Rest period in preferred room',
            afternoonRoutine: '12:00 PM - 25-minute midday walk\n12:30 PM - Lunch portion (1 cup with treats)\n1:30 PM - Indoor play circuit through all rooms\n2:30 PM - Training exercises using space variety\n3:30 PM - Calm activities and rest',
            eveningRoutine: '5:00 PM - 50-minute evening walk or dog park visit\n6:00 PM - Dinner (2 cups with full supplements)\n7:00 PM - Family bonding and advanced training\n7:45 PM - High-energy play sessions across apartment\n8:30 PM - Calm games and enrichment activities\n9:00 PM - Final 25-minute evening walk\n9:30 PM - Grooming, massage, and bonding time\n10:00 PM - Settle routine in sleeping area',
            exerciseTips: '- Morning walks 45-60 minutes with off-leash areas\n- Evening walks 50-60 minutes including varied terrain\n- Set up agility course using multiple rooms\n- Practice long-distance recalls across apartment\n- Dedicate one room for training and enrichment\n- Create rotation schedule between room activities\n- Daily dog park or doggy daycare sessions (1-2 hours)\n- Use balconies/terrace for outdoor enrichment\n- Schedule weekly hiking or beach trips\n- Join advanced training classes for mental stimulation',
            feedingSchedule: 'Breakfast: 7:00 AM - 2.5 cups (premium dry + fresh protein + vegetables)\nMorning snack: 10:30 AM - Training treats during sessions\nLunch: 12:30 PM - 1 cup with enrichment toy\nDinner: 6:00 PM - 2.5 cups (premium food + supplements + fresh additions)\nEvening treat: 8:30 PM - Long-lasting natural chew\n\nWater: Stations in every room (4-5 locations), automatic fountain in main area, refresh 6x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'cat',
            apartmentSize: 'studio',
            morningRoutine: '7:00 AM - Wake up and breakfast (1/4 cup dry food)\n7:30 AM - Litter box maintenance\n8:00 AM - 10-minute interactive play session with wand toy\n8:15 AM - Grooming and petting time\n8:30 AM - Morning nap on window perch',
            afternoonRoutine: '12:00 PM - Light lunch snack (treats or small portion)\n1:00 PM - Vertical space exploration time\n2:00 PM - Puzzle feeder engagement\n3:00 PM - Afternoon rest period',
            eveningRoutine: '5:00 PM - Dinner (1/4 cup wet food + 1/4 cup dry)\n6:00 PM - Active play session (15 minutes)\n7:00 PM - Training treats and trick practice\n8:00 PM - Calm bonding time\n9:00 PM - Final play burst before bed\n10:00 PM - Settle for night with favorite blanket',
            exerciseTips: '- Install vertical cat shelves on walls for climbing\n- Use curtain rods for aerial walkways\n- Rotate 3-4 toys daily to maintain interest\n- Schedule 2-3 play sessions of 10-15 minutes each\n- Place cat tree near window for entertainment\n- Hide treats around studio for hunting games\n- Use door-mounted scratching posts to save space',
            feedingSchedule: 'Breakfast: 7:00 AM - 1/4 cup dry food\nLunch treat: 12:00 PM - 5-6 training treats or freeze-dried protein\nDinner: 5:00 PM - 1/4 cup wet food + 1/4 cup dry food\nEvening snack: 8:00 PM - Small portion of treats\n\nWater: Fresh bowl refilled 3x daily, place away from food',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'cat',
            apartmentSize: '1bhk',
            morningRoutine: '7:00 AM - Wake up and breakfast (1/3 cup dry food + small wet portion)\n7:30 AM - Litter box cleaning in bathroom\n8:00 AM - 15-minute interactive play with variety of toys\n8:30 AM - Grooming session and nail trim check\n9:00 AM - Exploration time between rooms\n9:30 AM - Morning nap spot (window or cat tree)',
            afternoonRoutine: '12:00 PM - Lunch treats scattered for hunting\n1:00 PM - Room-to-room exploration period\n2:00 PM - Puzzle feeder or food toys\n3:00 PM - Afternoon rest in bedroom',
            eveningRoutine: '5:00 PM - Dinner (1/2 cup wet food + dry food)\n6:00 PM - High-energy play session (20 minutes)\n7:00 PM - Training time with clicker\n8:00 PM - Calm activities: brushing, window watching\n9:00 PM - Bedtime play session\n9:30 PM - Final treats and cuddle time\n10:00 PM - Settle in chosen sleeping spot',
            exerciseTips: '- Create vertical pathways between living room and bedroom\n- Install cat shelves in both rooms for circuits\n- Use doorways for mounted toys and scratchers\n- Set up multiple scratching posts in each room\n- Place bird feeders outside windows for entertainment\n- Rotate toys between rooms weekly\n- Schedule 3 play sessions daily (15-20 minutes each)\n- Use hallway for chase games and fetch',
            feedingSchedule: 'Breakfast: 7:00 AM - 1/3 cup dry + 2 tablespoons wet food\nLunch hunt: 12:00 PM - Treats hidden in both rooms\nDinner: 5:00 PM - 1/2 cup wet food + 1/3 cup dry food\nEvening snack: 9:00 PM - Training treats or dental treats\n\nWater: Bowls in living room and bedroom, fountain in main area, refill 4x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'cat',
            apartmentSize: '2bhk',
            morningRoutine: '7:00 AM - Wake up and breakfast in kitchen (1/2 cup varied foods)\n7:30 AM - Litter box maintenance (boxes in 2 locations)\n8:00 AM - 20-minute interactive play across rooms\n8:30 AM - Grooming and health check\n9:00 AM - Free exploration of all rooms\n9:30 AM - First nap location choice',
            afternoonRoutine: '12:00 PM - Lunch treats and puzzle feeders in different rooms\n1:00 PM - Vertical space circuit exploration\n2:00 PM - Training session with treats\n3:00 PM - Window perch time in preferred room\n4:00 PM - Afternoon rest period',
            eveningRoutine: '5:00 PM - Dinner (1/2 cup wet food + dry food in separate rooms)\n6:00 PM - High-energy play session (25 minutes)\n7:00 PM - Room-to-room games and enrichment\n8:00 PM - Calm activities: TV watching, brushing\n9:00 PM - Final play burst across apartment\n9:30 PM - Bedtime routine and treats\n10:00 PM - Night settling in favorite room',
            exerciseTips: '- Install floor-to-ceiling cat trees in 2 rooms\n- Create aerial highways connecting all rooms\n- Place multiple scratching stations throughout\n- Set up cat tunnels between furniture\n- Use spare bedroom as dedicated play room\n- Install window perches in every room\n- Schedule 4 play sessions daily (15-25 minutes)\n- Rotate toys between rooms for novelty\n- Create hunting games using treat dispensers\n- Set up different nap zones in each room',
            feedingSchedule: 'Breakfast: 7:00 AM - 1/2 cup (mix of wet and dry in kitchen)\nMorning snack: 10:00 AM - Treats during training\nLunch hunt: 12:00 PM - Puzzle feeders in different rooms\nDinner: 5:00 PM - 1/2 cup wet food (living room) + dry food (bedroom)\nEvening snack: 9:00 PM - Dental treats or freeze-dried protein\n\nWater: Fountains in 2 rooms, bowl in third room, refill 5x daily',
            createdAt: new Date().toISOString(),
        },
        {
            petType: 'cat',
            apartmentSize: '3bhk',
            morningRoutine: '7:00 AM - Wake up and breakfast station 1 (1/2 cup premium food)\n7:30 AM - Multiple litter box maintenance (3 locations)\n8:00 AM - 25-minute interactive play circuit through all rooms\n8:30 AM - Full grooming session and inspection\n9:00 AM - Free roaming and exploration time\n9:45 AM - Training session in dedicated room\n10:15 AM - Morning rest in chosen location',
            afternoonRoutine: '12:00 PM - Lunch served in different room than breakfast\n12:30 PM - Puzzle feeder challenges in spare rooms\n1:30 PM - Vertical exploration circuit\n2:30 PM - Training and enrichment activities\n3:30 PM - Window time in multiple locations\n4:30 PM - Afternoon nap period',
            eveningRoutine: '5:00 PM - Dinner in rotation spot (3/4 cup premium food)\n6:00 PM - High-energy play across entire apartment (30 minutes)\n7:00 PM - Room-to-room enrichment activities\n8:00 PM - Clicker training in dedicated space\n8:30 PM - Calm bonding in living room\n9:00 PM - Final play session circuit\n9:45 PM - Grooming and massage\n10:00 PM - Bedtime treats and settling',
            exerciseTips: '- Install multi-level cat highways throughout apartment\n- Dedicate one room as cat adventure zone\n- Place floor-to-ceiling trees in 3 locations\n- Create aerial pathways connecting all rooms at height\n- Set up multiple scratching stations (8-10 total)\n- Install window perches in every room\n- Use tunnels and hideaways in each space\n- Schedule 5 play sessions daily (20-30 minutes)\n- Rotate extensive toy collection daily\n- Create hunting circuits with treat trails\n- Set up automated toy rotations\n- Use balconies for supervised outdoor enrichment',
            feedingSchedule: 'Breakfast: 7:00 AM - 3/4 cup (premium wet/dry mix in kitchen)\nMorning hunt: 10:00 AM - Treats hidden throughout apartment\nLunch: 12:00 PM - 1/2 cup served in different room\nAfternoon snack: 3:00 PM - Puzzle feeders in spare rooms\nDinner: 5:00 PM - 3/4 cup (premium food rotated between rooms)\nEvening treats: 9:00 PM - Training treats and dental chews\n\nWater: Fountains in 3 rooms, additional bowls in 2 rooms, automatic fountain in main area, refill 6x daily',
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(routines).values(sampleRoutines);
    
    console.log('✅ Routines seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});