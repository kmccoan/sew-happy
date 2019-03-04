package com.husume.common.id;

import java.io.Serializable;
import java.util.function.Function;

public abstract class AbstractID implements Serializable, Comparable<AbstractID> {

    protected static <T extends AbstractID> T valueOf(Function<Integer, T> constructor, String value) {
        if (null == value) {
            return null;
        }

        final Integer intValue;
        try {
            intValue = Integer.valueOf(value);
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
        return constructor.apply(intValue);
    }
    protected static <T extends AbstractID> T valueOf(Function<Integer, T> constructor, Integer value) {
        return null == value ? null : constructor.apply(value);
    }

    private final Integer value;

    protected AbstractID(Integer value) {
        if (null == value) {
            throw new NullPointerException();
        }

        this.value = value;
    }

    public final Integer asInt() {
        return value;
    }
    public final String asString() {
        return value.toString();
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
        return this.asInt().compareTo(that.asInt());
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