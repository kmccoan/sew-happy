package com.husume.common.id;

import java.io.Serializable;
import java.util.UUID;
import java.util.function.Function;

public abstract class AbstractID implements Serializable, Comparable<AbstractID> {

    protected static <T extends AbstractID> T valueOf(Function<UUID, T> constructor, String value) {
        if (null == value) {
            return null;
        }

        final UUID uuidValue;
        try {
            uuidValue = UUID.fromString(value);
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
        return constructor.apply(uuidValue);
    }

    private final UUID value;

    protected AbstractID(UUID value) {
        if (null == value) {
            throw new NullPointerException();
        }

        this.value = value;
    }

    public final String asString() {
        return value.toString();
    }

    public final UUID asUUID() {
        return value;
    }

    @Override
    public final boolean equals(Object obj) {
        if (null == obj) {
            return false;
        }

        if (obj.getClass() != this.getClass()) {
            return false;
        }

        return ((AbstractID)obj).value.equals(this.value);
    }

    @Override
    public final int compareTo(AbstractID that) {
        return this.value.compareTo(that.value);
    }

    @Override
    public final int hashCode() {
        return value.hashCode();
    }

    @Override
    public final String toString() {
        return getClass().getSimpleName() + ":" + value;
    }
}