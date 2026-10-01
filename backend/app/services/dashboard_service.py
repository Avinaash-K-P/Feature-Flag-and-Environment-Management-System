from sqlalchemy.orm import Session
from app.models.feature_flag import FeatureFlag
from app.models.environment import Environment
from app.models.feature_flag_environment import FeatureFlagEnvironment
from app.models.feature_rollout import FeatureRollout
from app.models.user_assignment import UserAssignment
from sqlalchemy import func

def get_total_features(db: Session):
    return db.query(func.count(FeatureFlag.id)).scalar()

def get_active_features(db: Session):
    return (
        db.query(func.count(FeatureFlag.id))
        .filter(FeatureFlag.is_active == True)
        .scalar()
    )


def get_inactive_features(db: Session):
    return (
        db.query(func.count(FeatureFlag.id))
        .filter(FeatureFlag.is_active == False)
        .scalar()
    )


def get_total_environments(db: Session):
    return db.query(func.count(Environment.id)).scalar()


def get_active_environments(db: Session):
    return (
        db.query(func.count(Environment.id))
        .filter(Environment.is_active == True)
        .scalar()
    )


def get_inactive_environments(db: Session):
    return (
        db.query(func.count(Environment.id))
        .filter(Environment.is_active == False)
        .scalar()
    )


def get_feature_environment_configs(
    db: Session,
    feature_flag_id: int
):
    return (
        db.query(FeatureFlagEnvironment)
        .filter(
            FeatureFlagEnvironment.feature_flag_id == feature_flag_id
        )
        .all()
    )


def get_feature_rollouts(
    db: Session,
    feature_flag_id: int
):
    return (
        db.query(FeatureRollout)
        .join(
            FeatureFlagEnvironment,
            FeatureRollout.feature_flag_environment_id
            == FeatureFlagEnvironment.id
        )
        .filter(
            FeatureFlagEnvironment.feature_flag_id == feature_flag_id
        )
        .all()
    )


def get_feature_user_assignments(
    db: Session,
    feature_flag_id: int
):
    return (
        db.query(UserAssignment)
        .filter(
            UserAssignment.feature_flag_id == feature_flag_id
        )
        .all()
    )

def get_all_feature_usage(db: Session):

    features = db.query(FeatureFlag).all()

    result = []

    for feature in features:

        environment_configs = get_feature_environment_configs(
            db,
            feature.id # type: ignore
        )

        rollouts = get_feature_rollouts(
            db,
            feature.id # type: ignore
        )

        user_assignments = get_feature_user_assignments(
            db,
            feature.id # type: ignore
        )

        enabled_environments = sum(
            1 for config in environment_configs
            if config.is_enabled # type: ignore
        )

        active_rollouts = sum(
            1 for rollout in rollouts
            if rollout.is_active # type: ignore
        )

        enabled_assignments = sum(
            1 for assignment in user_assignments
            if assignment.is_enabled # type: ignore
        )

        result.append({
            "feature_id": feature.id,
            "feature_name": feature.name,
            "is_active": feature.is_active,
            "environment_count": len(environment_configs),
            "enabled_environment_count": enabled_environments,
            "rollout_count": len(rollouts),
            "active_rollout_count": active_rollouts,
            "user_assignment_count": len(user_assignments),
            "enabled_assignment_count": enabled_assignments
        })

    return result

def get_feature_usage(
    db: Session,
    feature_flag_id: int
):
    feature = (
        db.query(FeatureFlag)
        .filter(FeatureFlag.id == feature_flag_id)
        .first()
    )

    if not feature:
        return None

    environment_configs = get_feature_environment_configs(
        db,
        feature_flag_id
    )

    rollouts = get_feature_rollouts(
        db,
        feature_flag_id
    )

    user_assignments = get_feature_user_assignments(
        db,
        feature_flag_id
    )

    return {
        "feature": feature,
        "environment_configs": environment_configs,
        "rollouts": rollouts,
        "user_assignments": user_assignments
    }

def get_dashboard_summary(db: Session):

    total_features = get_total_features(db)
    active_features = get_active_features(db)
    inactive_features = get_inactive_features(db)

    total_environments = get_total_environments(db)
    active_environments = get_active_environments(db)
    inactive_environments = get_inactive_environments(db)

    total_rollouts = (
        db.query(func.count(FeatureRollout.id))
        .scalar()
    )

    active_rollouts = (
        db.query(func.count(FeatureRollout.id))
        .filter(FeatureRollout.is_active == True)
        .scalar()
    )

    inactive_rollouts = (
        db.query(func.count(FeatureRollout.id))
        .filter(FeatureRollout.is_active == False)
        .scalar()
    )

    return {
        "features": {
            "total": total_features,
            "active": active_features,
            "inactive": inactive_features
        },
        "environments": {
            "total": total_environments,
            "active": active_environments,
            "inactive": inactive_environments
        },
        "rollouts": {
            "total": total_rollouts,
            "active": active_rollouts,
            "inactive": inactive_rollouts
        }
    }