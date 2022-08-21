from app.models import db, User, Post


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')
    homelander = User(username='homelander', email='homelander@vought.com', password='ryan')
    starlight = User(username='starlight', email='anniejanuary@gmail.com', password='password')
    vought_intl = User(username='voughtintl', email='voughthq@vought.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(homelander)
    db.session.add(starlight)
    db.session.add(vought_intl)

    db.session.commit()

def seed_posts():
    post1 = Post(
        image_url='https://i.ytimg.com/vi/2iGcta6R_Nk/maxresdefault.jpg',
        description='Congratulations to the Deep for becoming Chief Sustainability Officer for Liquid Death!',
        user_id=5
    )

    post2 = Post(
        image_url='https://static.wikia.nocookie.net/amazons-the-boys/images/a/ab/Dawn-of-the-seven.jpg/revision/latest/scale-to-width-down/700?cb=20220520190954',
        description="We've heard your feedback and it's coming back for a limited time! Dawn of the Seven will be in theaters AGAIN next week",
        user_id=5
    )

    post3 = Post(
        image_url='https://www.highonfilms.com/wp-content/uploads/2022/07/The-Boys-Season-3-Episode-8-Recap-Ending-Explained.jpg',
        description="A behind the scenes look at American Hero, airing tonight. Don't miss it!",
        user_id=5
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
