from django.db import migrations

def fix_duplicates(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    # Example: Append numbers to duplicate emails
    seen_emails = set()
    for user in User.objects.all().order_by('id'):
        if user.email in seen_emails:
            user.email = f"{user.email}.{user.id}"  # Make unique
            user.save()
        seen_emails.add(user.email)

class Migration(migrations.Migration):
    dependencies = [
        ('accounts', '0002_remove_user_username_alter_user_email'),
    ]

    operations = [
        migrations.RunPython(fix_duplicates),
    ]