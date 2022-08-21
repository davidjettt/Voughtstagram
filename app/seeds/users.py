from app.models import db, User, Post, Comment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')
    homelander = User(username='homelander', email='homelander@vought.com', password='ryan')
    starlight = User(username='therealstarlight', email='anniejanuary@gmail.com', password='password')
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
        image_url='https://res.cloudinary.com/dpjpitop6/image/upload/v1661106766/maxresdefault_q8fish.jpg',
        description='Congratulations to the Deep for becoming Chief Sustainability Officer for Liquid Death!',
        user_id=6
    )

    post2 = Post(
        image_url='https://res.cloudinary.com/dpjpitop6/image/upload/v1661049206/281715475_401522891982495_494959663662951770_n_eeg6ru.jpg',
        description="We've heard your feedback and it's coming back for a limited time! Dawn of the Seven will be in theaters AGAIN next week",
        user_id=6
    )

    post3 = Post(
        image_url='https://res.cloudinary.com/dpjpitop6/image/upload/v1661106858/The-Boys-Season-3-Episode-8-Recap-Ending-Explained_cjiixk.jpg',
        description="A behind the scenes look at American Hero, airing tonight. Don't miss it!",
        user_id=6
    )

    post4 = Post(
        image_url = 'https://res.cloudinary.com/dpjpitop6/image/upload/v1661106927/Homelander-The-Boys_npsavd.jpg',
        description = 'Such a good pic of us, huh Starlight? 😍 #homelight',
        user_id = 4
    )

    post5 = Post(
        image_url = 'https://res.cloudinary.com/dpjpitop6/image/upload/v1661107286/the-boys3x07_0095_ycovid.jpg',
        description = "Vought is getting desperate, but y'all have seen the truth. Don't let up! #voughtliedpeopledied",
        user_id = 5
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)

    db.session.commit()


def seed_comments():
    comment1 = Comment(
        comment = "Can't wait to watch this again, Homelander was so great!!",
        user_id=2,
        post_id=2
    )

    comment2 = Comment(
        comment = "Unreal, this was all caught on video. Vought's days are numbered. #voughtliedpeopledied",
        user_id=3,
        post_id=5
    )

    comment3 = Comment(
        comment = "Really hoping supersonic wins this!!",
        user_id=1,
        post_id=3
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
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

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
